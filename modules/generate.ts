import {
  hexToUint8Array,
  uint8ArrayToHex,
} from "https://deno.land/x/crc32@v0.2.2/mod.ts";
import elliptic from "https://cdn.skypack.dev/elliptic";
import { ripemd160 } from "https://cdn.skypack.dev/@noble/hashes/ripemd160";
import bs58 from "https://cdn.skypack.dev/bs58";

function createRandomPrivateKey(): string {
  // Local function for comparing two buffer in deno ** Deno doesn't have a builtin function **
  const bufferCompare = (a: Uint8Array, b: Uint8Array): number => {
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    const len = Math.min(x, y);

    let i: number;
    for (i = 0; i < len; i++) {
      if (a[i] !== b[i]) break;
    }

    if (i !== len) {
      x = a[i];
      y = b[i];
    }

    return x < y ? -1 : y < x ? 1 : 0;
  };

  // Private key in bitcoin blockchain must be between min and max values
  const max = hexToUint8Array(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140",
  );
  const min = hexToUint8Array("00");

  const privateKey = new Uint8Array(32);
  let isInvalid = true;
  while (isInvalid) {
    crypto.getRandomValues(privateKey);
    if (
      bufferCompare(max, privateKey) === 1 &&
      bufferCompare(privateKey, min) === 1
    ) {
      isInvalid = false;
    }
  }

  return uint8ArrayToHex(privateKey);
}

const createPublicKey = (privateKey: string): string => {
  const EC = elliptic.ec;
  const ecdsa = new EC("secp256k1");
  const keys = ecdsa.keyFromPrivate(privateKey);
  const publicKey = keys.getPublic("hex");
  return publicKey;
};

const createPublicKeyHash = async (
  publicKey: string,
): Promise<Record<string, string>> => {
  const step1 = new Uint8Array(
    await crypto.subtle.digest("sha-256", hexToUint8Array(publicKey)),
  );
  const publicKeyHash = uint8ArrayToHex(
    ripemd160.create().update(step1).digest(),
  );
  return {
    step1: uint8ArrayToHex(step1),
    publicKeyHash: publicKeyHash,
  };
};

const createPublicAddress = async (
  publicKeyHash: string,
): Promise<Record<string, string>> => {
  const step1 = hexToUint8Array("00" + publicKeyHash);
  const step2 = await crypto.subtle.digest("sha-256", step1);
  const step3 = await crypto.subtle.digest("sha-256", step2);
  const checksum = uint8ArrayToHex(new Uint8Array(step3)).substring(0, 8);
  const step4 = uint8ArrayToHex(step1) + checksum;
  // Base 58 will be in std deno. Fix for next deno version
  const address = bs58.encode(hexToUint8Array(step4));
  return {
    step1: uint8ArrayToHex(step1),
    step2: uint8ArrayToHex(new Uint8Array(step2)),
    step3: uint8ArrayToHex(new Uint8Array(step3)),
    checksum: checksum,
    step4: step4,
    address: address,
  };
};

const createPrivateKeyWIF = async (
  privateKey: string,
): Promise<Record<string, string>> => {
  const step1 = hexToUint8Array("80" + privateKey);
  const step2 = await crypto.subtle.digest("sha-256", step1);
  const step3 = await crypto.subtle.digest("sha-256", step2);
  const checksum = uint8ArrayToHex(new Uint8Array(step3)).substring(0, 8);
  const step4 = uint8ArrayToHex(step1) + checksum;
  // Base 58 will be in std deno. Fix for next deno version
  const privateKeyWIF = bs58.encode(hexToUint8Array(step4));
  return {
    step1: uint8ArrayToHex(step1),
    step2: uint8ArrayToHex(new Uint8Array(step2)),
    step3: uint8ArrayToHex(new Uint8Array(step3)),
    checksum: checksum,
    step4: step4,
    privateKeyWIF: privateKeyWIF,
  };
};

export {
  createPrivateKeyWIF,
  createPublicAddress,
  createPublicKey,
  createPublicKeyHash,
  createRandomPrivateKey,
};
