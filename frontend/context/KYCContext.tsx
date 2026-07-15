"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { kycAPI, type KYCStatus, type KYCResponse } from "@/app/lib/api/kyc";

export type { KYCStatus };

interface KYCFormData {
  // Personal Information
  fullName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  // Identity Document
  idType: string;
  idNumber: string;
  expiryDate: string;
  idDocument: File | null;
  // Address
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
}

interface UploadedDocument {
  id: string;
  type: "id" | "address_proof" | "selfie";
  name: string;
  uploadedAt: string;
}

interface KYCContextType {
  isKYCModalOpen: boolean;
  kycStatus: KYCStatus;
  kycResponse: KYCResponse | null;
  formData: KYCFormData;
  uploadedDocuments: UploadedDocument[];
  openKYCModal: () => void;
  closeKYCModal: () => void;
  updateFormData: (data: Partial<KYCFormData>) => void;
  submitKYC: () => Promise<void>;
  uploadDocument: (file: File, type: "id" | "address_proof" | "selfie") => Promise<void>;
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
  refreshKYCStatus: () => Promise<void>;
  canCreatePlan: boolean;
}

const initialFormData: KYCFormData = {
  fullName: "",
  email: "",
  dateOfBirth: "",
  nationality: "",
  idType: "international_passport",
  idNumber: "",
  expiryDate: "",
  idDocument: null,
  streetAddress: "",
  city: "",
  country: "",
  postalCode: "",
};

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export const useKYC = () => {
  const context = useContext(KYCContext);
  if (!context) {
    throw new Error("useKYC must be used within a KYCProvider");
  }
  return context;
};

export const KYCProvider = ({ children }: { children: React.ReactNode }) => {
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [kycStatus, setKycStatus] = useState<KYCStatus>("pending");
  const [kycResponse, setKycResponse] = useState<KYCResponse | null>(null);
  const [formData, setFormData] = useState<KYCFormData>(initialFormData);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load persisted KYC status on mount and poll for updates
  useEffect(() => {
    const loadKYCStatus = async () => {
      try {
        setIsLoading(true);
        const status = require("@/lib/mockStore").mockStore.getKYCStatus() as KYCStatus;
        setKycStatus(status);
        setKycResponse({
          wallet_address: "GDE2KZQ4QGJZ5Z5QW2Y4B7Y6Q5D3P9V8N7M6L5K4J3H2G1FTEST",
          kyc_status: status,
          submitted_at: new Date().toISOString(),
        });
        setError(null);
      } catch (err) {
        console.error("Failed to load KYC status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadKYCStatus();

    // Poll mockStore for updates
    const pollInterval = setInterval(() => {
      const status = require("@/lib/mockStore").mockStore.getKYCStatus() as KYCStatus;
      setKycStatus(status);
      setKycResponse({
        wallet_address: "GDE2KZQ4QGJZ5Z5QW2Y4B7Y6Q5D3P9V8N7M6L5K4J3H2G1FTEST",
        kyc_status: status,
        submitted_at: new Date().toISOString(),
      });
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [kycStatus]);

  const openKYCModal = () => setIsKYCModalOpen(true);
  const closeKYCModal = () => setIsKYCModalOpen(false);

  const updateFormData = (data: Partial<KYCFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const uploadDocument = async (
    file: File,
    type: "id" | "address_proof" | "selfie"
  ) => {
    try {
      setError(null);
      const mockDocId = `doc_${Math.random().toString(36).substr(2, 9)}`;
      const newDocument: UploadedDocument = {
        id: mockDocId,
        type,
        name: file.name,
        uploadedAt: new Date().toISOString(),
      };
      setUploadedDocuments((prev) => [...prev, newDocument]);
    } catch (err) {
      setError("Failed to upload document");
      throw err;
    }
  };

  const submitKYC = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const mockStore = require("@/lib/mockStore").mockStore;
      mockStore.setKYCStatus("pending");
      setKycStatus("pending");
      setKycResponse({
        wallet_address: "GDE2KZQ4QGJZ5Z5QW2Y4B7Y6Q5D3P9V8N7M6L5K4J3H2G1FTEST",
        kyc_status: "pending",
        submitted_at: new Date().toISOString(),
      });

      // Automatically approve after 8 seconds for nice user feedback
      setTimeout(() => {
        mockStore.setKYCStatus("approved");
        setKycStatus("approved");
      }, 8000);

      setTimeout(() => {
        closeKYCModal();
      }, 1500);

      setFormData(initialFormData);
      setUploadedDocuments([]);
    } catch (err) {
      setError("Failed to submit KYC");
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshKYCStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await kycAPI.getKYCStatus();
      setKycResponse(response);
      setKycStatus(response.kyc_status);
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to refresh KYC status";
      setError(errorMsg);
      console.error("Failed to refresh KYC status:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const canCreatePlan = kycStatus === "approved";

  return (
    <KYCContext.Provider
      value={{
        isKYCModalOpen,
        kycStatus,
        kycResponse,
        formData,
        uploadedDocuments,
        openKYCModal,
        closeKYCModal,
        updateFormData,
        submitKYC,
        uploadDocument,
        isSubmitting,
        isLoading,
        error,
        refreshKYCStatus,
        canCreatePlan,
      }}
    >
      {children}
    </KYCContext.Provider>
  );
};

