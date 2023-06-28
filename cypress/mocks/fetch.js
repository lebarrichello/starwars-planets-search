import testData from './testData';

const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(testData),
});

export default mockFetch;
