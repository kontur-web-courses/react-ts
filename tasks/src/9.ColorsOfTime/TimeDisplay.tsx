import React from 'react';
import './styles.css';

type TimeDisplayProps = { time: Date | null; color?: string };

export default function TimeDisplay({ time, color }: TimeDisplayProps) {
  return <div className={`time ${color || ''}`}>{time ? time.toLocaleTimeString() : '--:--:--'}</div>;
}
