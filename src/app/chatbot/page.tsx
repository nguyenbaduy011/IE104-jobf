"use client";
import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const Chatbot: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setError(null); // Clear previous errors
    };

    const handleSubmit = async () => {
        if (!input.trim()) {
            setError("Vui lòng nhập yêu cầu");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:8080/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            if (!res.ok) {
                throw new Error('Không thể kết nối tới máy chủ');
            }

            const data = await res.json();
            setResponse(data.answer || 'Không có phản hồi');
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi');
            setResponse('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Chatbot Tìm Việc Làm
                </h1>

                <div className="mb-4">
                    <textarea 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Nhập yêu cầu của bạn (ví dụ: Tìm việc làm lập trình viên)..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        disabled={isLoading}
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={isLoading || !input.trim()}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                               transition duration-300 flex items-center justify-center
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 animate-spin" />
                            Đang tìm kiếm...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2" size={20} />
                            Gửi Yêu Cầu
                        </>
                    )}
                </button>

                {response && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h2 className="text-lg font-semibold text-blue-700 mb-3">
                            Kết Quả:
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {response}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;