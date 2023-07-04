/**
 * Copyright (c) 2016, David J. Wu, Kevin Lewi
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

#include "crypto.h"
#include "errors.h"
#include "ore_blk.h"

#include <errno.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

static int _error;
#define ERR_CHECK(x)                                                           \
  if ((_error = x) != ERROR_NONE) {                                            \
    return _error;                                                             \
  }

// Auction parameters
// Note: these numbers are also reflected in the choice of integer types

// ORE
#define NBITS 32
#define BLOCK_LEN 8

// Generated files
#define PARAMS_FILE "params.dat"
#define Y_FILE "y.dat"
#define D_FILE "d.dat"

#define HALT_IF(condition, ...)                                                \
  if (condition) {                                                             \
    fprintf(stderr, __VA_ARGS__);                                              \
    return -1;                                                                 \
  }

// static int decrypt(ore_blk_ciphertext ctxt, int nbits) {
//   // binary search
//   uint64_t middle = (((uint64_t) 1) << (nbits + 1));
// }

static uint32_t decrypt(ore_blk_ciphertext ctxt, ore_blk_secret_key sk) {
  // Repeat until the pointers low and high meet each other
  uint32_t low = 0;
  uint32_t high = UINT32_MAX;
  uint32_t mid;

  ore_blk_ciphertext guess;
  init_ore_blk_ciphertext(guess, sk->params);

  while (low <= high) {
    mid = low + ((high - low) >> 1);

    ore_blk_encrypt_ui(guess, sk, mid);

    int res;
    ore_blk_compare(&res, guess, ctxt);

    if (res == 0)
      return mid;

    if (res < 0)
      low = mid + 1;

    else
      high = mid - 1;
  }

  return 0;
}
typedef struct {
  ore_blk_ciphertext ctxt;
  int                id;
} bid;

static int compare_bids(const void *bid1, const void *bid2) {
  int res;
  ore_blk_compare(&res, ((bid *)bid1)->ctxt, ((bid *)bid2)->ctxt);

  return res;
}

int save_params(char *params_file, ore_blk_secret_key sk) {
  FILE *file = fopen(params_file, "w");
  HALT_IF(file == NULL, "could not write %s\nerror: %d\n", params_file, errno)

  fwrite(sk, sizeof(ore_blk_secret_key), 1, file);

  fclose(file);

  return 0;
}

int load_params(char *params_file, ore_blk_secret_key sk,
                ore_blk_params params) {
  FILE *file = fopen(params_file, "r");
  HALT_IF(file == NULL, "could not read %s\nerror: %d\n", params_file, errno)

  fread(sk, sizeof(ore_blk_secret_key), 1, file);
  memcpy(params, sk->params, sizeof(ore_blk_params));

  fclose(file);

  return 0;
}

void write_ctxt(FILE *file, ore_blk_ciphertext ctxt) {
  fwrite(ctxt->comp_left, _ore_blk_ciphertext_len_left(ctxt->params), 1, file);
  fwrite(ctxt->comp_right, _ore_blk_ciphertext_len_right(ctxt->params), 1,
         file);
}

void read_ctxt(FILE *file, ore_blk_ciphertext ctxt, ore_blk_params params) {
  init_ore_blk_ciphertext(ctxt, params);
  fread(ctxt->comp_left, _ore_blk_ciphertext_len_left(params), 1, file);
  fread(ctxt->comp_right, _ore_blk_ciphertext_len_right(params), 1, file);
}

int main(int argc, char **argv) {
  HALT_IF(argc < 2,
          "%s [create-auction] | [bid] params-file bid | [sort] "
          "params-file y-files\n",
          argv[0])

  if (!strcmp(argv[1], "create-auction")) {

    // generate auction parameters
    ore_blk_secret_key sk;
    ore_blk_params     params;

    ERR_CHECK(init_ore_blk_params(params, NBITS, BLOCK_LEN))
    ERR_CHECK(ore_blk_setup(sk, params))

    save_params(PARAMS_FILE, sk);

  } else if (!strcmp(argv[1], "bid")) {
    HALT_IF(argc < 4, argc == 2 ? "params file?\n" : "bid?\n")

    // step 1: parse data
    char    *tmp;
    uint64_t bid = strtoull(argv[3], &tmp, 10);
    HALT_IF(*tmp != 0, "bid is not a valid number\n")

    ore_blk_secret_key sk;
    ore_blk_params     params;

    ERR_CHECK(load_params(argv[2], sk, params))
    // step 2: generate y
    ore_blk_ciphertext y;

    ERR_CHECK(init_ore_blk_ciphertext(y, params))
    ERR_CHECK(ore_blk_encrypt_ui(y, sk, bid))

    FILE *file = fopen(Y_FILE, "w");
    HALT_IF(file == NULL, "could not write %s\nerror: %d\n", Y_FILE, errno)

    write_ctxt(file, y);
    fclose(file);
  } else if (!strcmp(argv[1], "sort")) {
    HALT_IF(argc < 4, argc == 3 ? "y file[s]?\n" : "params file?\n")

    // step 1: parse data
    ore_blk_secret_key sk;
    ore_blk_params     params;

    ERR_CHECK(load_params(argv[2], sk, params))

    bid  *ys = malloc(sizeof(bid) * (argc - 3));
    FILE *file;
    for (int i = 0; i < argc - 3; ++i) {
      file = fopen(argv[i + 3], "r");
      HALT_IF(file == NULL, "could not read %s\nerror: %d\n", argv[i + 3],
              errno)

      read_ctxt(file, ys[i].ctxt, params);
      ys[i].id = i;
      fclose(file);
    }

    // step 2: sort ys
    qsort(ys, argc - 3, sizeof(bid), compare_bids);

    puts("here is the sort");
    for (int i = 0; i < argc - 3; ++i) {
      printf("bid %d -> %u\n", ys[i].id, decrypt(ys[i].ctxt, sk));
    }
  } else {
    HALT_IF(1, "what do you want?\n")
  }

  return 0;
}
