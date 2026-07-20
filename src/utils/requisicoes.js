export async function requisicoes(url, method = "GET") {
  let geral = {
    method: method.toUpperCase(),
    
    headers: {
      "Content-Type" : "application/json",
    },
  };

  let response;
  let json;

  try {
      response = await fetch(url);
    }catch(e){
      console.error(e);

      return null;
    }

    json = await response.json();

    return json;

}