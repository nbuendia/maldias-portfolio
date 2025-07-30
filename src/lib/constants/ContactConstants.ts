export const CONTACT_ASCII = 
`
   .--.         
 .'_\\/_'.         _     U _____ u  _____   ____           ____   _   _      _       _____    _    
  ( o_o )        |"|    \\| ___"|/ |_ " _| / __"| u     U /"___| |'| |'| U  /"\\  u  |_ " _| U|"|u  
 /|  V  |\\     U | | u   |  _|"     | |  <\\___ \\/      \\| | u  /| |_| |\\ \\/ _ \\/     | |   \\| |/  
//|_____|\\\\     \\| |/__  | |___    /| |\\  u___) |       | |/__ U|  _  |u / ___ \\    /| |\\   |_|   
||       ||      |_____| |_____|  u |_|U  |____/>>       \\____| |_| |_| /_/   \\_\\  u |_|U   (_)   
 |___|___|       //  \\\\  <<   >>  _// \\\\_  )(  (__)     _// \\\\  //   \\\\  \\\\    >>  _// \\\\_  |||_  
 (__) (__)      (_")("_)(__) (__)(__) (__)(__)         (__)(__)(_") ("_)(__)  (__)(__) (__)(__)_) 
`;

export const CONTACT_INFO = ["> Name: Nicole Buendia", "> Email: test@email.com", "> GitHub: github.com/nbuendia", "> LinkedIn: linkedin.com/in/nicole-buendia"];

export const EMAIL_REGEX = /^--email\s+(['"])([^\s"']+@[^\s"']+\.[^\s"']+)\1\s*$/i;
export const MESSAGE_REGEX = /^--msg\s+(['"])(.{1,250})\1\s*$/i;
export const RESET_REGEX = /^--reset(?:\s+([\w-]+))?/;
