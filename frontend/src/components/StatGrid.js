import React from "react";

function StatGrid() {
    return (<div className="grid grid-cols-2 gap-6">
        <div className="relative flex justify-between items-center py-28">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img 
                src="/path-to-large-profile.jpg" 
                className="w-40 h-40 rounded-full border-4 border-[#2a2a2a] shadow-xl"
                alt="Large profile"
              />
              <div className="absolute w-44 -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] px-4 py-1 rounded-full shadow-lg">
                <span className="text-sm text-gray-300 text-center block">Name</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Posts', value: '0' },
              { label: 'Likes', value: '64' },
              { label: 'Following', value: '83' },
              { label: 'Followers', value: '91' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-2xl font-bold text-gray-200">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        </div>)
}

export default StatGrid;