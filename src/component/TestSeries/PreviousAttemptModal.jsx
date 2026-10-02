import { Button } from "@/components"


export const PreviousAttemptModal = ({onCloseModal,previousAttempts,onLoadHistoryAttempt}) => {
    
    return <div className="fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl mt-6 relative border border-slate-600">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h2 className="text-xl font-bold text-amber-300">📋 Previous Attempts</h2>
                <Button onClick={onCloseModal} className="text-slate-400 hover:text-white text-2xl">✕</Button>
            </div>
            <div className="space-y-4">
                {previousAttempts.length === 0
                    ? <div className="text-slate-400 text-center py-10 font-medium">No previous attempts found. Start a mock test!</div>
                    : [...previousAttempts].reverse().map((a, i) => (
                        <div key={a.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:bg-slate-700 transition">
                            <div>
                                <div className="text-amber-300 font-bold">{a.mockName} <span className="text-sm font-normal text-amber-200/50">(Attempt #{previousAttempts.length - i})</span></div>
                                <div className="text-slate-300 text-sm mt-1">👤 {a.candidateName || "Aspirant"} · 📅 {a.date}</div>
                            </div>
                            <div className="flex gap-4 text-center">
                                <div><div className="text-xs text-slate-400 uppercase">Score</div><div className="text-lg font-bold text-sky-400">{a.marks}</div></div>
                                <div><div className="text-xs text-slate-400 uppercase">Accuracy</div><div className="text-lg font-bold text-emerald-400">{a.accuracy}%</div></div>
                            </div>
                            <Button onClick={()=>onLoadHistoryAttempt(a.id)} className="px-4 py-2 bg-slate-800 border border-amber-500/50 text-amber-300 rounded-lg hover:bg-slate-900 transition text-sm font-semibold">View Analysis</Button>
                        </div>
                    ))}
            </div>
        </div>
    </div>
}