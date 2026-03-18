const regex = /`{3}(?:json)?\s*({[\s\S]*?})\s*`{3}/;

export const outputJson = (input : string) => {
  const match = input.match(regex);

if (match) {
  const jsonString = match[1];
  console.log('Extracted JSON:', jsonString);
  
  // To use it as an object:
  const data = JSON.parse(jsonString);
  console.log('Score is:', data.score);
    return data 
} else {
  console.log('No JSON block found.');
  return {score : -1 }
}

}

