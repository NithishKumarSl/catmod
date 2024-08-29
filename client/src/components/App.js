import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';
import ProjectName from './projectName';

const GEMINI_API_KEY = 'AIzaSyAqap2NWQ_ZHco018rf-1-9nbrOoOuRCkE';

function App() {
  const [projectName, setProjectName] = useState('');
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handlePreview = () => {
    const previewWindow = window.open();
    previewWindow.document.write(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
    previewWindow.document.close();
  };

  const generateCode = async (prompt) => {
    setIsLoading(true);
    
    try {
      const enhancedPrompt = `Generate modern, responsive HTML, CSS, and JavaScript code using Bootstrap 5 for the following prompt: "${prompt}".
 
      Please provide the code in three separate parts:

      1. HTML: Create a structure using semantic HTML5 elements and Bootstrap classes. Include only the body content, not the full HTML document.

      2. CSS: Provide custom CSS styles to enhance the Bootstrap components. Do not include any Bootstrap CSS here.

      3. JavaScript: Write any necessary JavaScript for interactivity or functionality.

      Guidelines:
      - Use Bootstrap 5 components and utilities for layout and design.
      - Implement a color scheme that matches the theme or mood of the prompt.
      - Ensure the design is responsive using Bootstrap's grid system.
      - Include form validation if the design involves user input.
      - Optimize the code for performance and readability.
      - Include comments in the code to explain complex parts.

      Format the response as follows:
      ---HTML---
      (Your HTML code here)
      ---CSS---
      (Your CSS code here)
      ---JavaScript---
      (Your JavaScript code here)
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              contents: [{
                  parts: [{
                      text: enhancedPrompt
                  }]
              }],
              generationConfig: {
                  temperature: 0.7,
                  topK: 40,
                  topP: 0.95,
                  maxOutputTokens: 100192,
              }
          })
      });
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
    
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));
      const generatedText = data.candidates[0].content.parts[0].text;

      // Parse the generated text to extract HTML, CSS, and JS
      const htmlMatch = generatedText.match(/```html([\s\S]*?)```/);
      const cssMatch = generatedText.match(/```css([\s\S]*?)```/);
      const jsMatch = generatedText.match(/```javascript([\s\S]*?)```/);

      if (htmlMatch) setHtml(htmlMatch[1].trim());
      if (cssMatch) setCss(cssMatch[1].trim());
      if (jsMatch) setJs(jsMatch[1].trim());
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const Loader = () => (
    <div className="loader">
      <div className="wrapper">
        <div className="catContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 733 673"
            className="catbody"
          >
            <path
              fill="#FFA500"
              d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
            ></path>
            <path fill="#FFA500" d="M184 9L270.603 159H97.3975L184 9Z"></path>
            <path fill="#FFA500" d="M541 0L627.603 150H454.397L541 0Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 158 564"
            className="tail"
          >
            <path
              fill="#FF8C00"
              d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
            ></path>
          </svg>
          <div className="text">
            <span className="bigzzz">HTML</span>
            <span className="smzzz">CSS</span>
          <span className="zzz">JS</span>
          </div>
        </div>
        <div className="wallContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 500 126"
            className="wall"
          >
            <line strokeWidth="6" stroke="#7C7C7C" y2="3" x2="450" y1="3" x1="50"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="85" x2="400" y1="85" x1="100"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="122" x2="375" y1="122" x1="125"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="1.99391" x2="115.5" y1="43.0061" x1="115.5"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="2.00002" x2="189" y1="43.0122" x1="189"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="2.00612" x2="262.5" y1="43.0183" x1="262.5"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="2.01222" x2="336" y1="43.0244" x1="336"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="2.01833" x2="409.5" y1="43.0305" x1="409.5"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="153" y1="84.0122" x1="153"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="228" y1="84.0122" x1="228"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="303" y1="84.0122" x1="303"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="378" y1="84.0122" x1="378"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="192" y1="125.012" x1="192"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="267" y1="125.012" x1="267"></line>
            <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="342" y1="125.012" x1="342"></line>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.5);
          z-index: 9999;
        }
        .wrapper {
          position: relative;
          width: 300px;
          height: 300px;
        }
        .catContainer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .catbody {
          width: 80px;
        }
        .tail {
          position: absolute;
          width: 17px;
          top: 60%;
          right: 25px;
          animation: tail 0.5s ease-in infinite alternate-reverse;
          transform-origin: top;
          z-index: 999999;
        }
        .text {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: -30px;
          right: -40px;
        }
        .bigzzz {
          color: black;
          font-weight: 700;
          font-size: 25px;
          margin-left: 12px;
          animation: zzz 2.5s linear infinite;
        }
        .smzzz{
        color: black;
          font-weight: 700;
          font-size: 18px;
           margin-left: 8px;
          animation: zzz 2.3s linear infinite;
        }
        
        .zzz {
          color: black;
          font-weight: 700;
          font-size: 15px;
          animation: zzz 2s linear infinite;
        }
        .wall {
          width: 300px;
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;
        }
        @keyframes tail {
          0% { transform: rotateZ(60deg); }
          50% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(-20deg); }
        }
        @keyframes zzz {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );

  if (!projectName) {
    return <ProjectName onsubmit={setProjectName} />;
  }

  return (
    <>
      <Header onPreview={handlePreview} onGenerateCode={generateCode} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="pane top-pane">
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
            />
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
            />
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
            />
          </div>
          <div className="pane">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;