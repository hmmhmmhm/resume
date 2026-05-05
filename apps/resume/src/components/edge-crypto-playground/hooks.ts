import { useMemo, useState } from "react";
import type {
  EdgeCryptoModule,
  HashAlgorithm,
  PlaygroundTabId,
  StatusState,
} from "./data";
import {
  defaultHashInput,
  defaultPassword,
  defaultPlaintext,
  defaultRsaMessage,
} from "./data";
import { useBootstrapEdgeCrypto } from "./bootstrap-hook";

export function useEdgeCrypto(isKorean: boolean) {
  const [cryptoModule, setCryptoModule] = useState<EdgeCryptoModule | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [checkingSupport, setCheckingSupport] = useState<boolean>(true);

  // Symmetric state
  const [encryptMessage, setEncryptMessage] = useState(defaultPlaintext);
  const [encryptPassword, setEncryptPassword] = useState(defaultPassword);
  const [ciphertextOutput, setCiphertextOutput] = useState<string>("");
  const [encryptBusy, setEncryptBusy] = useState<boolean>(false);
  const [encryptStatus, setEncryptStatus] = useState<StatusState>({ type: "idle", message: "" });

  const [decryptCiphertext, setDecryptCiphertext] = useState<string>("");
  const [decryptPassword, setDecryptPassword] = useState(defaultPassword);
  const [decryptOutput, setDecryptOutput] = useState<string>("");
  const [decryptBusy, setDecryptBusy] = useState<boolean>(false);
  const [decryptStatus, setDecryptStatus] = useState<StatusState>({ type: "idle", message: "" });

  // Hashing state
  const [hashInput, setHashInput] = useState(defaultHashInput);
  const [hashAlgorithm, setHashAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hashOutput, setHashOutput] = useState<string>("");
  const [hashBusy, setHashBusy] = useState<boolean>(false);
  const [hashStatus, setHashStatus] = useState<StatusState>({ type: "idle", message: "" });

  // RSA encryption state
  const [rsaEncryptionKeyPair, setRsaEncryptionKeyPair] = useState<CryptoKeyPair | null>(null);
  const [rsaEncryptionGenerating, setRsaEncryptionGenerating] = useState<boolean>(false);
  const [rsaEncryptionStatus, setRsaEncryptionStatus] = useState<StatusState>({ type: "idle", message: "" });
  const [rsaEncryptMessage, setRsaEncryptMessage] = useState(defaultRsaMessage);
  const [rsaEncryptCiphertext, setRsaEncryptCiphertext] = useState<string>("");
  const [rsaDecryptCiphertext, setRsaDecryptCiphertext] = useState<string>("");
  const [rsaDecryptOutput, setRsaDecryptOutput] = useState<string>("");
  const [rsaEncryptionBusy, setRsaEncryptionBusy] = useState<boolean>(false);

  // RSA signing state
  const [rsaSigningKeyPair, setRsaSigningKeyPair] = useState<CryptoKeyPair | null>(null);
  const [rsaSigningGenerating, setRsaSigningGenerating] = useState<boolean>(false);
  const [rsaSigningStatus, setRsaSigningStatus] = useState<StatusState>({ type: "idle", message: "" });
  const [rsaSignMessage, setRsaSignMessage] = useState(defaultRsaMessage);
  const [rsaSignature, setRsaSignature] = useState<string>("");
  const [rsaVerifyMessage, setRsaVerifyMessage] = useState(defaultRsaMessage);
  const [rsaVerifySignature, setRsaVerifySignature] = useState<string>("");
  const [rsaSigningBusy, setRsaSigningBusy] = useState<boolean>(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<PlaygroundTabId>("symmetric");

  // Module bootstrap (extracted to bootstrap-hook.ts)
  useBootstrapEdgeCrypto({
    setCryptoModule,
    setLoadError,
    setSupported,
    setCheckingSupport,
    setCiphertextOutput,
    setDecryptCiphertext,
    setEncryptStatus,
    setHashOutput,
    setHashStatus,
    setRsaEncryptionKeyPair,
    setRsaEncryptCiphertext,
    setRsaDecryptCiphertext,
    setRsaEncryptionStatus,
    setRsaSigningKeyPair,
    setRsaSignature,
    setRsaVerifyMessage,
    setRsaVerifySignature,
    setRsaSigningStatus,
  });

  const installHint = useMemo(() => {
    if (loadError) {
      return isKorean
        ? "플레이그라운드를 활성화하려면 apps/resume 내에서 `pnpm add edge-crypto`를 실행하세요."
        : "Run `pnpm add edge-crypto` inside apps/resume to enable the playground.";
    }
    if (checkingSupport) {
      return isKorean ? "SubtleCrypto 가용성 확인 중..." : "Checking SubtleCrypto availability...";
    }
    if (supported === false) {
      return isKorean
        ? "이 환경에서는 SubtleCrypto를 사용할 수 없습니다."
        : "SubtleCrypto is not available in this environment.";
    }
    return null;
  }, [checkingSupport, loadError, supported, isKorean]);

  const isReady = cryptoModule && supported !== false;

  // ----- Handlers -----

  async function handleSymmetricEncrypt() {
    if (!cryptoModule) {
      setEncryptStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!encryptMessage.trim()) {
      setEncryptStatus({ type: "error", message: isKorean ? "암호화할 메시지를 입력하세요." : "Provide a message to encrypt." });
      return;
    }
    if (!encryptPassword.trim()) {
      setEncryptStatus({ type: "error", message: isKorean ? "비밀번호를 입력하세요." : "Provide a password." });
      return;
    }
    setEncryptBusy(true);
    setEncryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptToString(encryptMessage, encryptPassword);
      setCiphertextOutput(result);
      setDecryptCiphertext(result);
      setDecryptOutput("(awaiting decryption)");
      setEncryptStatus({ type: "success", message: isKorean ? "AES-GCM으로 암호화되었습니다." : "Encrypted with AES-GCM." });
    } catch (error) {
      console.error(error);
      setEncryptStatus({
        type: "error",
        message: isKorean
          ? "암호화에 실패했습니다. SubtleCrypto가 지원되는지 확인하세요."
          : "Encryption failed. Ensure SubtleCrypto is supported.",
      });
    } finally {
      setEncryptBusy(false);
    }
  }

  async function handleSymmetricDecrypt() {
    if (!cryptoModule) {
      setDecryptStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!decryptCiphertext.trim()) {
      setDecryptStatus({ type: "error", message: isKorean ? "AES-GCM으로 생성된 암호문을 붙여넣으세요." : "Paste a ciphertext generated with AES-GCM." });
      return;
    }
    if (!decryptPassword.trim()) {
      setDecryptStatus({ type: "error", message: isKorean ? "암호화에 사용된 비밀번호를 입력하세요." : "Provide the password used for encryption." });
      return;
    }
    setDecryptBusy(true);
    setDecryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptFromString(decryptCiphertext, decryptPassword);
      setDecryptOutput(result);
      setDecryptStatus({ type: "success", message: isKorean ? "암호문이 성공적으로 복호화되었습니다." : "Ciphertext decrypted successfully." });
    } catch (error) {
      console.error(error);
      setDecryptStatus({
        type: "error",
        message: isKorean
          ? "복호화에 실패했습니다. 비밀번호나 암호문을 다시 확인하세요."
          : "Decryption failed. Double-check the password or ciphertext.",
      });
    } finally {
      setDecryptBusy(false);
    }
  }

  async function handleHash() {
    if (!cryptoModule) {
      setHashStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!hashInput.trim()) {
      setHashStatus({ type: "error", message: isKorean ? "해시할 입력을 제공하세요." : "Provide input to hash." });
      return;
    }
    setHashBusy(true);
    setHashStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.hash(hashInput, hashAlgorithm);
      setHashOutput(result);
      setHashStatus({ type: "success", message: isKorean ? `${hashAlgorithm} 다이제스트를 생성했습니다.` : `Generated ${hashAlgorithm} digest.` });
    } catch (error) {
      console.error(error);
      setHashStatus({ type: "error", message: isKorean ? "해싱에 실패했습니다." : "Hashing failed." });
    } finally {
      setHashBusy(false);
    }
  }

  async function handleGenerateRSAEncryptionKeys() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    setRsaEncryptionGenerating(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const keys = await cryptoModule.generateRSAKeyPair({ modulusLength: 2048 });
      setRsaEncryptionKeyPair(keys);
      setRsaEncryptCiphertext("");
      setRsaDecryptCiphertext("");
      setRsaDecryptOutput("");
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "RSA-OAEP 키 쌍이 준비되었습니다." : "RSA-OAEP key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA-OAEP 키 생성에 실패했습니다." : "RSA-OAEP key generation failed." });
    } finally {
      setRsaEncryptionGenerating(false);
    }
  }

  async function handleRSAEncryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "먼저 RSA 키 쌍을 생성하세요." : "Generate an RSA key pair first." });
      return;
    }
    if (!rsaEncryptMessage.trim()) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "암호화할 메시지를 입력하세요." : "Provide a message to encrypt." });
      return;
    }
    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptRSA(rsaEncryptMessage, rsaEncryptionKeyPair.publicKey);
      setRsaEncryptCiphertext(result);
      setRsaDecryptCiphertext(result);
      setRsaDecryptOutput("(awaiting decryption)");
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "RSA-OAEP로 암호화되었습니다." : "Encrypted with RSA-OAEP." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA 암호화에 실패했습니다." : "RSA encryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleRSADecryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "먼저 RSA 키 쌍을 생성하세요." : "Generate an RSA key pair first." });
      return;
    }
    if (!rsaDecryptCiphertext.trim()) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "복호화할 암호문을 붙여넣으세요." : "Paste a ciphertext to decrypt." });
      return;
    }
    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptRSA(rsaDecryptCiphertext, rsaEncryptionKeyPair.privateKey);
      setRsaDecryptOutput(result);
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "개인 키로 암호문이 복호화되었습니다." : "Ciphertext decrypted with private key." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA 복호화에 실패했습니다." : "RSA decryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleGenerateRSASigningKeys() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    setRsaSigningGenerating(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const keys = await cryptoModule.generateRSASigningKeyPair({ modulusLength: 2048 });
      setRsaSigningKeyPair(keys);
      setRsaSignature("");
      setRsaVerifySignature("");
      setRsaSigningStatus({ type: "success", message: isKorean ? "RSA 서명 키 쌍이 준비되었습니다." : "RSA signing key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 서명 키 생성에 실패했습니다." : "RSA signing key generation failed." });
    } finally {
      setRsaSigningGenerating(false);
    }
  }

  async function handleRSASignMessage() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "먼저 서명 키 쌍을 생성하세요." : "Generate a signing key pair first." });
      return;
    }
    if (!rsaSignMessage.trim()) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "서명할 메시지를 입력하세요." : "Provide a message to sign." });
      return;
    }
    setRsaSigningBusy(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.signRSA(rsaSignMessage, rsaSigningKeyPair.privateKey);
      setRsaSignature(result);
      setRsaVerifyMessage(rsaSignMessage);
      setRsaVerifySignature(result);
      setRsaSigningStatus({ type: "success", message: isKorean ? "RSA-PSS로 메시지가 서명되었습니다." : "Message signed with RSA-PSS." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 서명에 실패했습니다." : "RSA signing failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  async function handleRSAVerifySignature() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "먼저 서명 키 쌍을 생성하세요." : "Generate a signing key pair first." });
      return;
    }
    if (!rsaVerifySignature.trim()) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "검증할 서명을 입력하세요." : "Provide a signature to verify." });
      return;
    }
    setRsaSigningBusy(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const valid = await cryptoModule.verifyRSA(rsaVerifyMessage, rsaVerifySignature, rsaSigningKeyPair.publicKey);
      setRsaSigningStatus({
        type: valid ? "success" : "error",
        message: valid
          ? (isKorean ? "공개 키로 서명이 검증되었습니다." : "Signature verified with public key.")
          : (isKorean ? "서명 검증에 실패했습니다." : "Signature verification failed."),
      });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 검증에 실패했습니다." : "RSA verification failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  return {
    // meta
    loadError,
    installHint,
    isReady,
    // symmetric
    encryptMessage, setEncryptMessage,
    encryptPassword, setEncryptPassword,
    ciphertextOutput,
    encryptBusy,
    encryptStatus,
    decryptCiphertext, setDecryptCiphertext,
    decryptPassword, setDecryptPassword,
    decryptOutput,
    decryptBusy,
    decryptStatus,
    handleSymmetricEncrypt,
    handleSymmetricDecrypt,
    // hashing
    hashInput, setHashInput,
    hashAlgorithm, setHashAlgorithm,
    hashOutput,
    hashBusy,
    hashStatus,
    handleHash,
    // rsa encryption
    rsaEncryptionKeyPair,
    rsaEncryptionGenerating,
    rsaEncryptionStatus,
    rsaEncryptMessage, setRsaEncryptMessage,
    rsaEncryptCiphertext,
    rsaDecryptCiphertext, setRsaDecryptCiphertext,
    rsaDecryptOutput,
    rsaEncryptionBusy,
    handleGenerateRSAEncryptionKeys,
    handleRSAEncryptMessage,
    handleRSADecryptMessage,
    // rsa signing
    rsaSigningKeyPair,
    rsaSigningGenerating,
    rsaSigningStatus,
    rsaSignMessage, setRsaSignMessage,
    rsaSignature,
    rsaVerifyMessage, setRsaVerifyMessage,
    rsaVerifySignature, setRsaVerifySignature,
    rsaSigningBusy,
    handleGenerateRSASigningKeys,
    handleRSASignMessage,
    handleRSAVerifySignature,
    // tab
    activeTab, setActiveTab,
  };
}
