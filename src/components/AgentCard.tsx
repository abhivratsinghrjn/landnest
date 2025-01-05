import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src={agent.imageUrl}
          alt={agent.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{agent.city}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {agent.specialty.map((spec) => (
            <span
              key={spec}
              className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <Phone className="h-4 w-4 mr-2" />
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <Mail className="h-4 w-4 mr-2" />
          {agent.email}
        </a>
      </div>
    </div>
  );
}