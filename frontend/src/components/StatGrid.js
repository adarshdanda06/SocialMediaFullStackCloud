import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import url from "../serverURL";


function StatGrid({ currentUser, imgURL, apiCheck }) {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({ followers: 0, following: 0, posts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });

  const fetchStats = async (username) => {
    if (!username) {
      console.log("No username available, skipping fetch");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/users/${currentUser}/count`);
      console.log("Response data:", response.data);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'An error occurred while fetching stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchStats(currentUser);
    }
  }, [currentUser, apiCheck]);

  if (!currentUser) return <p>Loading user...</p>;
  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="relative flex justify-between items-center py-28">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img 
              src={imgURL}
              className="w-40 h-40 rounded-full border-4 border-[#2a2a2a] shadow-xl"
              alt="Large profile"
            />
            <div className="absolute w-44 -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] px-4 py-1 rounded-full shadow-lg">
              <span className="text-sm text-gray-300 text-center block">{currentUser}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Posts', value: stats.posts },
            { label: 'Following', value: stats.following },
            { label: 'Followers', value: stats.followers }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-2xl font-bold text-gray-200">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatGrid;