"use client"
import { useState } from "react";

const EssayPage = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSubmit = async () => {
        const res = await fetch("/api/essay-grader", {
            method: "POST",
            body: JSON.stringify({ prompt: input }),
        });
        const data = await res.json();
        const score = JSON.parse(data.text).score;
        setOutput(score);

    };
    return (
        <main className="mx-auto max-w-7xl">
            <h1 className="p-4 pl-0 font-bold text-xl">Essay Grader</h1>
            <div className="grid grid-cols-2 gap-2">
                <div className="">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={20}
                        name=""
                        id=""
                        className="w-full border border-slate-300 rounded-xl"
                        placeholder="Input"
                    >
                    </textarea>
                    <button
                        onClick={handleSubmit}
                        className=" w-full text-center border border-indigo-500 p-4 rounded-full hover:bg-indigo-500 hover:text-white"
                    >
                        Get Score
                    </button>
                </div>
                <div
                    className="flex flex-col p-4"
                >
                    <h2
                        className="text-3xl"
                    >
                        Score : {output}
                    </h2>
                    
                    <h2
                        className="text-3xl"
                    >
                        Length : {input.length}
                    </h2>
                </div>
            </div>
        </main>
    )
}

export default EssayPage