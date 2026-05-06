import { useEffect } from "react";
import type { EdgeCryptoModule, StatusState } from "./data";
import {
  defaultHashInput,
  defaultPassword,
  defaultPlaintext,
  defaultRsaMessage,
} from "./data";

export interface BootstrapSetters {
  setCryptoModule: (m: EdgeCryptoModule | null) => void;
  setLoadError: (s: string | null) => void;
  setSupported: (s: boolean | null) => void;
  setCheckingSupport: (s: boolean) => void;
  setCiphertextOutput: (s: string) => void;
  setDecryptCiphertext: (s: string) => void;
  setEncryptStatus: (s: StatusState) => void;
  setHashOutput: (s: string) => void;
  setHashStatus: (s: StatusState) => void;
  setRsaEncryptionKeyPair: (k: CryptoKeyPair | null) => void;
  setRsaEncryptCiphertext: (s: string) => void;
  setRsaDecryptCiphertext: (s: string) => void;
  setRsaEncryptionStatus: (s: StatusState) => void;
  setRsaSigningKeyPair: (k: CryptoKeyPair | null) => void;
  setRsaSignature: (s: string) => void;
  setRsaVerifyMessage: (s: string) => void;
  setRsaVerifySignature: (s: string) => void;
  setRsaSigningStatus: (s: StatusState) => void;
}

export function useBootstrapEdgeCrypto(setters: BootstrapSetters): void {
  useEffect(() => {
    let mounted = true;

    import("edge-crypto")
      .then(async (mod) => {
        if (!mounted) return;
        setters.setCryptoModule(mod);
        try {
          const envSupport = mod.isSupported();
          setters.setSupported(envSupport);

          if (envSupport) {
            try {
              const encrypted = await mod.encryptToString(defaultPlaintext, defaultPassword);
              setters.setCiphertextOutput(encrypted);
              setters.setDecryptCiphertext(encrypted);
              setters.setEncryptStatus({ type: "success", message: "Encrypted with AES-GCM." });
            } catch (err) {
              console.error("Auto-encrypt failed:", err);
            }

            try {
              const hashResult = await mod.hash(defaultHashInput, "SHA-256");
              setters.setHashOutput(hashResult);
              setters.setHashStatus({ type: "success", message: "Generated SHA-256 digest." });
            } catch (err) {
              console.error("Auto-hash failed:", err);
            }

            try {
              const encKeys = await mod.generateRSAKeyPair({ modulusLength: 2048 });
              setters.setRsaEncryptionKeyPair(encKeys);
              const rsaEncrypted = await mod.encryptRSA(defaultRsaMessage, encKeys.publicKey);
              setters.setRsaEncryptCiphertext(rsaEncrypted);
              setters.setRsaDecryptCiphertext(rsaEncrypted);
              setters.setRsaEncryptionStatus({ type: "success", message: "RSA-OAEP key pair ready." });
            } catch (err) {
              console.error("Auto-RSA-encrypt failed:", err);
            }

            try {
              const signKeys = await mod.generateRSASigningKeyPair({ modulusLength: 2048 });
              setters.setRsaSigningKeyPair(signKeys);
              const signature = await mod.signRSA(defaultRsaMessage, signKeys.privateKey);
              setters.setRsaSignature(signature);
              setters.setRsaVerifyMessage(defaultRsaMessage);
              setters.setRsaVerifySignature(signature);
              setters.setRsaSigningStatus({ type: "success", message: "RSA signing key pair ready." });
            } catch (err) {
              console.error("Auto-RSA-sign failed:", err);
            }
          }
        } catch (error) {
          console.error(error);
          setters.setSupported(null);
          setters.setLoadError("Unable to detect SubtleCrypto support.");
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        if (mounted) {
          setters.setLoadError(
            "edge-crypto failed to load. Ensure the dependency is installed and available on the client."
          );
        }
      })
      .finally(() => {
        if (mounted) setters.setCheckingSupport(false);
      });

    return () => {
      mounted = false;
    };
  }, []);
}
