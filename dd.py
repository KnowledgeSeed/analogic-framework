import base64
import ecdsa

pri = ecdsa.SigningKey.generate(curve=ecdsa.NIST256p)
pub = pri.get_verifying_key()
keys = {
  "private" : base64.urlsafe_b64encode(pri.to_string()).decode("utf-8").strip("="),
  "public" : base64.urlsafe_b64encode(b"\x04" + pub.to_string()).decode("utf-8").strip("=")
}
print(keys)