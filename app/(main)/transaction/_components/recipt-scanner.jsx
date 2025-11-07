"use client";

import { useRef, useEffect, useCallback } from "react"; // ADD useCallback
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  
  // ⚡ FIX: Ref to track if the current scanned data has been processed
  const hasProcessedData = useRef(false); 

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    // Reset the flag to allow a new scan to be processed
    hasProcessedData.current = false; 

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    // 🛑 Loop Guard: Exit if data is already processed OR if we don't have new data
    if (hasProcessedData.current || !scannedData || scanReceiptLoading) {
      return;
    }

    // Mark as processed before calling the potentially infinite-looping function (onScanComplete)
    hasProcessedData.current = true; 

    // Process the scanned data
    if (Object.keys(scannedData).length > 0) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully! 🎉");
    } else {
      // This handles the case where the AI returns {} (not a receipt)
      toast.warning(
        "The AI could not recognize a receipt in the image. Please try again."
      );
      onScanComplete(scannedData);
    }
  // The dependencies are correct as they are.
  }, [scanReceiptLoading, scannedData, onScanComplete]); 

  // OPTIONAL: Use useCallback to stabilize handleReceiptScan (best practice)
  const memoizedHandleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={memoizedHandleClick} // Use memoized click handler
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}