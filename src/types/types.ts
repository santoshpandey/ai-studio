export interface GenerationRequest {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

export interface GenerationResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export type StyleOption = 'Editorial' | 'Streetwear' | 'Vintage';
