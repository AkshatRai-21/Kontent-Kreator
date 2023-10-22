"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("e140c65c-7401-4e64-b971-84c62d83f8c5");
  }, []);

  return null;
};
