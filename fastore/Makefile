CC = clang
INCPATHS = -I/usr/local/include
CFLAGS = -g -Wall -O3 $(INCPATHS) -march=native
LDLIBS = -lgmp -lssl -lcrypto
LDPATH = -L/usr/local/lib

BUILD = build
TESTS = tests

SRC = crypto.c ore_blk.c
TESTPROGS = chainauction

OBJPATHS = $(patsubst %.c,$(BUILD)/%.o, $(SRC))
TESTPATHS = $(addprefix $(TESTS)/, $(TESTPROGS))

all: $(OBJPATHS) $(TESTPATHS)

obj: $(OBJPATHS)

$(BUILD):
	mkdir -p $(BUILD)

$(TESTS):
	mkdir -p $(TESTS)

$(BUILD)/%.o: %.c | $(BUILD)
	$(CC) $(CFLAGS) -o $@ -c $<

$(TESTS)/%: %.c $(OBJPATHS) $(TESTS)
	$(CC) $(CFLAGS) -o $@ $< $(LDPATH) $(OBJPATHS) $(LDLIBS)

clean:
	rm -rf $(BUILD) $(TESTS) *~
