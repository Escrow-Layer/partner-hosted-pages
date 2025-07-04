interface QRCodeDisplayProps {
  address: string;
}

const QRCodeDisplay = ({ address }: QRCodeDisplayProps) => {
  // For demo purposes, we'll use a placeholder QR code
  // In production, you'd use a QR code library like qrcode.js
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <img 
          src={qrCodeUrl}
          alt="QR Code for deposit address"
          className="w-48 h-48 object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default QRCodeDisplay;