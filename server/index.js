const express = require("express");
const app = express();

const admin = require("firebase-admin");

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const Web3 = require("web3");

//first endpoint
//check if wallet address is valid
const isValidEthAddress = (address) => Web3.utils.isAddress(address);

//generates a different message to sign for each wallet address or authentication attempt
const makeId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const getMessageToSign = async (req, res) => {
  try {
    const { address } = req.query;

    if (!isValidEthAddress(address)) {
      return res.send({ error: "invalid_address" });
    }

    const randomString = makeId(20);
    let messageToSign = `Wallet address: ${address} Nonce: ${randomString}`;

    // Get user data from firestore database
    const user = await admin.firestore().collection("users").doc(address).get();

    if (user.data() && user.data().messageToSign) {
      // messageToSign already exists for that particular wallet address
      messageToSign = user.data().messageToSign;
    } else {
      // messageToSign doesn't exist, save it to firestore database
      admin.firestore().collection("users").doc(address).set(
        {
          messageToSign,
        },
        {
          merge: true,
        }
      );
    }

    return res.send({ messageToSign, error: null });
  } catch (error) {
    console.log(error);
    return res.send({ error: "server_error" });
  }
};

app.get("/message", getMessageToSign);

//second endpoint
const { recoverPersonalSignature } = require("eth-sig-util");

// helper function called isValidSignature that checks the following:
// The Signature, Message to Sign and Wallet Address have the correct format.
// The Signing Address is the same as the User Address.
const isValidSignature = (address, signature, messageToSign) => {
  if (!address || typeof address !== "string" || !signature || !messageToSign) {
    return false;
  }

  const signingAddress = recoverPersonalSignature({
    data: messageToSign,
    sig: signature,
  });

  if (!signingAddress || typeof signingAddress !== "string") {
    return false;
  }

  return signingAddress.toLowerCase() === address.toLowerCase();
};

const getJWT = async (req, res) => {
  try {
    const { address, signature } = req.query;

    if (!isValidEthAddress(address) || !signature) {
      return res.send({ error: "invalid_parameters" });
    }

    const [customToken, doc] = await Promise.all([
      admin.auth().createCustomToken(address),
      admin.firestore().collection("users").doc(address).get(),
    ]);

    if (!doc.exists) {
      return res.send({ error: "invalid_message_to_sign" });
    }

    const { messageToSign } = doc.data();

    if (!messageToSign) {
      return res.send({ error: "invalid_message_to_sign" });
    }

    const validSignature = isValidSignature(address, signature, messageToSign);

    if (!validSignature) {
      return res.send({ error: "invalid_signature" });
    }

    // Delete messageToSign as it can only be used once
    admin.firestore().collection("users").doc(address).set(
      {
        messageToSign: null, //reset message to sign because we use it only once
      },
      {
        merge: true,
      }
    );

    return res.send({ customToken, error: null });
  } catch (err) {
    console.log("Error:", err);
    return res.send({ error: "server_error" });
  }
};

app.get("/jwt", getJWT);

//////////////////////////////////////

const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
