<template></template>
  
<script>
export default {
  mounted() {
    const githubApiUrl1 = 'https://api.github.com/repos/TG-Twilight/AWAvenue-Ads-Rule/releases/latest';
    const githubApiUrl2 = 'https://api.github.com/repos/TG-Twilight/AWAvenue-Adblock-Rule/releases/latest';

    fetch(githubApiUrl1)
      .then(response => response.json())
      .then(data => {
        handleResponse(data);
      })
      .catch(error => {
        console.error('Error fetching data from', githubApiUrl1, 'Error:', error);
        // If the first request fails, try the second one
        setTimeout(() => {
          fetch(githubApiUrl2)
            .then(response => response.json())
            .then(data => {
              handleResponse(data);
            })
            .catch(error => {
              console.error('Error fetching data from', githubApiUrl2, 'Error:', error);
            });
        }, 500);
      });

    function handleResponse(data) {
      if (document.getElementById("info")) {
        const body = data.body.replace(/\r\n/g, '<br/>');
        document.getElementById('info').innerHTML = body;
      }
      document.getElementById('version').innerHTML = data.name;
      document.getElementById('date').innerHTML = data.published_at;
      document.getElementById('hidden').innerHTML = '';
    }
  }
}
</script>