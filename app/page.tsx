"use client"
import { useState } from "react";

const EssayPage = () => {
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/essay-grader", {
                method: "POST",
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            const parsedData = JSON.parse(data.text);
            setScore(parsedData.score);
        } catch (error) {
            console.error("Failed to fetch score:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const circumference = 364.4;
    const offset = circumference - (score / 10) * circumference;

    const getStatusColor = (score:any) => {
        if (score >= 8) return 'text-emerald-500';
        if (score >= 5) return 'text-amber-500';
        return 'text-rose-500';
    };

    const colorClass = getStatusColor(score);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900 font-sans">


            {/* Header */}
            <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
                        EssayGrader<span className="text-slate-400">.ai</span>
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Instant AI-powered Essay Gradder</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">


                {/* Input */}
                <section className="lg:col-span-8 flex flex-col gap-4">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-[500px] p-6 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-lg leading-relaxed placeholder:text-slate-300"
                            placeholder="Paste your essay here..."
                        />
                        <div className="absolute bottom-4 right-6 text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            {input.length} Characters
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !input}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Analyzing...</span>
                        ) : (
                            <>
                                <span>Analyze Composition</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </>
                        )}
                    </button>
                </section>



                {/* Result */}
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                            Overall Quality
                        </span>

                        <div className="relative flex items-center justify-center mb-4">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle
                                    cx="64" cy="64" r="58"
                                    stroke="currentColor" strokeWidth="8" fill="transparent"
                                    className="text-slate-100"
                                />
                                <circle
                                    cx="64" cy="64" r="58"
                                    stroke="currentColor" strokeWidth="8" fill="transparent"
                                    className={`${colorClass} transition-all duration-1000 ease-in-out`}
                                    style={{
                                        strokeDasharray: circumference,
                                        strokeDashoffset: offset,
                                        strokeLinecap: 'round'
                                    }}
                                />
                            </svg>
                            <span className={`absolute text-3xl font-black italic transition-colors duration-700 ${colorClass}`}>
                                {score}<span className="text-sm not-italic font-medium text-slate-400">/10</span>
                            </span>
                        </div>

                        <p className="text-sm font-medium text-slate-600">
                            {score >= 8 ? "Strong work!" : score >= 5 ? "Good start, keep refining." : "Needs significant revision."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Word Count</p>
                            <p className="text-xl font-bold text-slate-800 tracking-tight">
                                {input.trim() === "" ? 0 : input.trim().split(/\s+/).length}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Reading Time</p>
                            <p className="text-xl font-bold text-slate-800 tracking-tight">
                                {Math.ceil(input.split(/\s+/).length / 200)}m
                            </p>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default EssayPage;