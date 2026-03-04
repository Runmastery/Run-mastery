export const secondsToClock = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const pacePerKmFromVelocity = (v: number): string => {
  const secondsPerKm = 1000 / v;
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.round(secondsPerKm % 60);
  return `${m}:${String(s).padStart(2, '0')}/km`;
};

export const calculatePaces = (current5kTime: number) => {
  const v = 5000 / current5kTime;
  const easy = pacePerKmFromVelocity(v * 0.78);
  const tempo = pacePerKmFromVelocity(v * 0.9);
  const interval = pacePerKmFromVelocity(v * 1.05);
  const rep = pacePerKmFromVelocity(v * 1.12);
  return { easy, tempo, interval, rep, longRun: easy };
};

export const parseMinutesSeconds = (minutes: string, seconds: string): number => {
  const m = Number(minutes);
  const s = Number(seconds);
  return m * 60 + s;
};

export const isTimeFormatValid = (input: string): boolean => /^([0-5]?\d:[0-5]\d|\d{1,2}:[0-5]\d:[0-5]\d)$/.test(input);
