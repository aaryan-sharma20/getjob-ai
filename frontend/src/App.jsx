import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/upload-resume/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setHistory((prev) => [data, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  // Chart Data (simple logic for now)
  const chartData =
    result?.skills?.map((skill, index) => ({
      name: skill,
      value: 90 - index * 10,
    })) || [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900/80 backdrop-blur-lg p-6 border-r border-gray-800">
        <h1 className="text-xl font-bold mb-6">GETJOB AI 🚀</h1>
        <ul className="space-y-4 text-gray-400">
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">
            Dashboard
          </li>
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">
            Upload Resume
          </li>
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">
            History
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        {/* UPLOAD */}
        <div className="max-w-xl mx-auto mb-8 bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 w-full text-sm text-gray-300"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg w-full font-medium disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </div>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm">Resume Score</p>
                <p
                  className={`text-2xl font-bold ${
                    result.score > 70
                      ? "text-green-400"
                      : result.score > 40
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {result?.score ?? 0}/100
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm">Skills Found</p>
                <p className="text-2xl font-bold">
                  {result.skills?.length || 0}
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm">Resume</p>
                <p className="text-sm truncate">
                  {result.filename}
                </p>
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700 mb-6">
              <h3 className="mb-3 font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CHART */}
            <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700 mb-6">
              <h3 className="mb-4 font-semibold">Skills Analysis</h3>

              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827", // dark bg
                        border: "1px solid #374151",
                        borderRadius: "10px",
                      }}
                      labelStyle={{ color: "#9ca3af" }}
                      itemStyle={{ color: "#22c55e" }}
                    />
                    <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* JOBS */}
            <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700">
              <h3 className="mb-4 font-semibold">Recommended Jobs</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommended_jobs?.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-xl hover:bg-gray-600 hover:scale-[1.02] transition transform"
                  >
                    <p className="font-semibold">{job}</p>
                    <p className="text-sm text-gray-400">
                      Suggested Role
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* HISTORY */}
            {history.length > 0 && (
              <div className="bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700 mt-6">
                <h3 className="mb-4 font-semibold">Upload History</h3>

                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                    >
                      <p className="text-sm">{item.filename}</p>
                      <p className="text-sm text-green-400">
                        {item.score ?? 0}/100
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result?.feedback && (
              <div style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white"
              }}>
                <h3>🧠 AI Resume Feedback</h3>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {result.feedback}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;