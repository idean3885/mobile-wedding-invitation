export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = 'https://j4df09bd732eb302e05d225dd6ae40649.apppaas.app';
    const targetUrl = origin + url.pathname + url.search;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        Host: 'j4df09bd732eb302e05d225dd6ae40649.apppaas.app',
      },
    });

    return new Response(response.body, response);
  },
};
