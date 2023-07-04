if [ "$1" = "create-auction" ]; then
    # ore params (publish)
    ./chainauction create-auction

    # private key
    openssl genrsa -out private.pem 2048

    # public key (publish)
    openssl rsa -in private.pem -pubout -out public.pem

elif [ "$1" = "bid" ]; then
    # y
    ./chainauction bid params.dat "$2"

    # z (publish only on reveal)
    openssl pkeyutl -encrypt -pubin -inkey public.pem -in y.dat -out z$3.dat

    # d (publish)
    openssl dgst -sha256 y.dat | awk '{print $2}' >d$3.dat

    # c (publish)
    openssl dgst -sha256 z$3.dat | awk '{print $2}' >c$3.dat

elif [ "$1" = "sort" ]; then
    # decrypt z.dat
    for z in z*.dat; do
        openssl pkeyutl -decrypt -inkey private.pem -in "$z" -out "$z".dec
    done

    # sort (owner) or verify (bidder)
    ./chainauction sort params.dat z*.dat.dec
fi
