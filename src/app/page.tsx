"use client";
import { error } from "console";
import Image from "next/image";
import { abort } from "process";
import style from "styled-jsx/style";
import { ImageUpload } from "./components/ImageUpload";
import { PromptInput } from "./components/PromptInput";
import { StyleDropdown } from "./components/StyleDropdown";
import { useState } from 'react';
//import { LiveSummary } from './components/LiveSummary';
//import { GenerationHistory } from './components/GenerationHistory';
//import { useLocalStorage } from './hooks/useLocalStorage';
//import { useExponentialBackoff } from './hooks/useExponentialBackoff';
import { GenerationRequest, GenerationResponse, StyleOption } from '../types/types';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useExponentialBackoff } from "@/hooks/useExponentialBackoff";

const mockApiCall = async (
  request: GenerationRequest
): Promise<GenerationResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // 20% chance of error
  if (Math.random() < 0.2) {
    throw new Error('Model overloaded');
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    imageUrl: request.imageDataUrl, // In real app, this would be a server URL
    prompt: request.prompt,
    style: request.style,
    createdAt: new Date().toISOString(),
  };
};


export default function Home() {
  const [imageData, setImageData] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<StyleOption>('Editorial');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useLocalStorage<GenerationResponse[]>(
    'generationHistory',
    []
  );

  const { execute, abort } = useExponentialBackoff();

  const generationRequest: GenerationRequest = {
    imageDataUrl: imageData,
    prompt,
    style,
  };

  const handleGenerate = async () => {
    if (!imageData) {
      setError('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await execute(() => mockApiCall(generationRequest));
      
      setHistory(prev => [response, ...prev].slice(0, 5));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (item: GenerationResponse) => {
    setImageData(item.imageUrl);
    setPrompt(item.prompt);
    setStyle(item.style as StyleOption);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Studio</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ImageUpload
                onImageChange={setImageData}
                currentImage={imageData}
              />
              <PromptInput value={prompt} onChange={setPrompt} />
              <StyleDropdown value={style} onChange={setStyle} />
            </div>

            <div className="space-y-6">
              {/*<LiveSummary data={generationRequest} />*/}
              
              <div className="flex space-x-4">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !imageData}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
                
                {isLoading && (
                  <button
                    onClick={abort}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Abort
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/*<GenerationHistory
            items={history}
            onItemClick={handleHistoryItemClick}
          />*/}
        </div>
      </div>
    </div>

      </main>
    
    </div>
  );
}
