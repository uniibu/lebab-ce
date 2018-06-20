<template>
  <div class="header_section">
    <b-container>
      <h1>Lebab modernizes your JavaScript code!</h1>
      <b-btn 
        size="lg" 
        variant="outline-warning" 
        class="pl-5 pr-5" 
        to="/readme">Read More</b-btn>
      <div class="iframebox">
        <iframe 
          class="iframestar" 
          src="https://ghbtns.com/github-btn.html?user=lebab&amp;repo=lebab&amp;type=star&amp;count=true&amp;size=large"/>
      </div>
    </b-container>
  </div>
</template>

<style scoped lang="inline">
.header_section {
  background: #333 url('~/assets/images/big.jpg') 50%;
  background-size: cover;
  text-align: center;
  padding: 140px 0 80px 0;
  min-height: 400px;
}

.header_section h1 {
  color: #f5da55;
  font-size: 2.2em;
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 100px;
}

@media (min-width: 768px) {
  .header_section h1 {
    font-size: 3em;
  }
}
.header_section .btn-outline-warning {
  color: #ffffff;
  background-color: transparent;
  background-image: none;
  border-color: #f5da55;
  margin-bottom: 50px;
  max-width: 90%;
  width: 400px;
}

.header_section .btn-outline-warning:hover {
  color: #f5da55;
  background-color: #212529;
  border-color: #212529;
}

.iframestar {
  border: 0;
  background-color: transparent;
  height: 32px;
  width: 143px;
}
</style>