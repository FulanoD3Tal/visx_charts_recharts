import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

interface AppleStock {
  date: string;
  close: number;
}

export async function getFakeData() {
  const { data } = await api.get<AppleStock[]>('/fake-data');

  return data;
}
