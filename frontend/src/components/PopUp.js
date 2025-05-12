import { CheckCircle, XCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function AccessPopup({ granted = true }) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md px-6 py-4 flex items-center gap-3 relative w-[320px]">
        {granted ? (
          <CheckCircle className="text-softblue" />
        ) : (
          <XCircle className="text-softblue" />
        )}
        <span className="text-oceanblue font-semibold">
          {granted ? 'Access granted !' : 'Access denied !'}
        </span>
        <button
          className="absolute top-2 right-2 text-oceanblue hover:oceanblue/80"
          onClick={() => setShow(false)}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}