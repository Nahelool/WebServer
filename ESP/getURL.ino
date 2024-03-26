String getURL(int D3,int D2,int D1,int D0){
  char shortURL[30] = "http://10.0.0.n:5000/dogData";
  char longURL[30] = "http://10.0.0.1n:5000/dogData";
  char lastOctet;

  if(D3==1 && (D1==1||D2==1)){
    lastOctet = 38 + D0+D1*2+D2*4+D3*8;
    longURL[15] = lastOctet;
    return longURL;
  }else{
    lastOctet = 48 + D0+D1*2+D2*4+D3*8;
    shortURL[14] = lastOctet;
    return shortURL;
  }
}
