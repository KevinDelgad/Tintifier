// Pop up start //

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  //Close Modal if User Clicks outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

// Close popup ad when X button is clicked
const closeBtn = document.querySelector('.close');
const modal = document.getElementById("modal");

closeBtn.addEventListener('click', function() {
  modal.style.display = "none";
});



// Pop up end //


const palette = [
  "#FF55FE",
  "#FF0054",
  "#FE0000",
  "#FF5500",
  "#FFFF01",
  "#AFFF00",
  "#00FF01",
  "#55FFFF",
  "#00AFFF",
  "#0055FE",
  "#5500FE",
  "#AF00FF",
  "#81002B",
  "#8B4512",
  "#D3AF37",
  "#006C00",
  "#008081",
  "#004771",
  "#55007F",
  "#242424",
];

const gradientPalette = [
  {
      label: 'Pride',
      gradient: [
          [255, 0, 0, .5],
          [255, 85, 0, .5],
          [255, 255, 0, .5],
          [0, 148, 196, .5],
          [0, 0, 255, .5],
          [170, 0, 255, .5]
      ]
  },
  {
      label: 'Easter',
      gradient: [
          [0, 254, 170, .5],
          [0, 225, 254, .5],
          [251, 0, 254, .5]
      ]
  },
  {
      label: 'Sunset',
      gradient: [
          [252, 222, 108, .5],
          [252, 181, 108, .5],
          [252, 71, 59, .5]
      ]
  },
  {
      label: 'July',
      gradient: [
          [255, 0, 0, .5],
          [253, 76, 71, .5],
          [56, 95, 223, .5],
          [0, 85, 255, .5]
      ]
  },
  {
      label: 'Roulette',
      gradient: [
          [145, 53, 184, .5],
          [217, 47, 109, .5],
          [57, 147, 177, .5],
          [89, 47, 255, .5],
          [99, 44, 216, .5]    
      ]
  }
];

const paletteNames = [
  "Pink",
  "Rose",
  "Red",
  "Orange",
  "Yellow",
  "Lime",
  "Green",
  "Cyan",
  "Sky-Blue",
  "Blue",
  "Indigo",
  "Violet",
  "Maroon",
  "Brown",
  "Gold",
  "Dark-Green",
  "Teal",
  "Navy-Blue",
  "Purple",
  "Black",
];

const inputFile = document.getElementById("input-file");
inputFile.addEventListener("change", handleFileSelect, false);

function tintImage(image, color) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
     
  // convert hex color string to RGB object
  const hexToRgb = (hex) => ({
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  });

  const rgbColor = typeof color === "string" ? hexToRgb(color) : color;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const r = rgbColor.r / 255;
  const g = rgbColor.g / 255;
  const b = rgbColor.b / 255;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3] / 255;
    data[i] *= r * alpha;
    data[i + 1] *= g * alpha;
    data[i + 2] *= b * alpha;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

function gradientView(){
  const elementToRemove = document.getElementById("output-img")

  if(elementToRemove.tagName === "IMG"){
    elementToRemove.remove();
    const canvas = document.createElement('canvas');
    canvas.id = "output-img"
    const appendItem = document.getElementById("output-box")

    appendItem.insertBefore(canvas, appendItem.firstChild)
  }
}

function imgView(){
  const elementToRemove = document.getElementById("output-img")

  if(elementToRemove.tagName === "CANVAS"){
    elementToRemove.remove();
    const image = document.createElement('img');
    image.id = "output-img"
    image.source = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    const appendItem = document.getElementById("output-box")

    appendItem.insertBefore(image, appendItem.firstChild)
  }
}

function updateGradient(colorGradient, img, firstLoad, offset){
  if(firstLoad)
  {
      canvas = document.createElement('canvas');
      canvas.id = gradientPalette[colorGradient].label
      canvasList = document.getElementById('tinted-images');

      canvas.addEventListener("click", function () {
        console.log("Clicked!");
        gradientView();
        document.getElementById("output-img");
        document.getElementById("color-label").textContent = gradientPalette[colorGradient].label
        document.getElementById("color-label").style.color = palette[i];
      });
      canvasList.appendChild(canvas)
    }else{
       canvas = document.getElementById(gradientPalette[colorGradient].label)
    }

    const ctx = canvas.getContext('2d');
    ctx.canvas.width = img.width
    ctx.canvas.height = img.height

    const grd1 = ctx.createLinearGradient(0, offset, 0, canvas.height + offset);
    const grd2 = ctx.createLinearGradient(0, offset - canvas.height, 0, offset);

    for (let i = 0; i < gradientPalette[colorGradient].gradient.length; i++) {
      const rgba = gradientPalette[colorGradient].gradient[i];
      const colorString1 = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;

      grd1.addColorStop(i / gradientPalette[colorGradient].gradient.length, colorString1);
      grd2.addColorStop(i / gradientPalette[colorGradient].gradient.length, colorString1);
    }

    // Clear the entire canvas before drawing the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = grd1;
    ctx.fillRect(0, offset, canvas.width, canvas.height);

    ctx.fillStyle = grd2;
    ctx.fillRect(0, offset - canvas.height, canvas.width, canvas.height);

    offset += 2;

    if (offset > canvas.height) {
      offset = 0;
    }

    requestAnimationFrame(() => updateGradient(colorGradient, img, false, offset));
}

function clearContainers() {
  // Clear the "tinted-images" container
  const container = document.getElementById("tinted-images");
  container.innerHTML = "";

  // Clear the output container
  const outputBox = document.getElementById("output-img");
  outputBox.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  // Reset the color label
  const colorLabel = document.getElementById("color-label");
  colorLabel.textContent = "Color";
}



function handleFileSelect(event) {
  console.log("go script.js!!");

  clearContainers();

  // Get the selected file and create a URL for it
  const selectedFile = event.target.files[0];
  const url = URL.createObjectURL(selectedFile);

  // Display the selected image in the preview element
  const preview = document.getElementById("preview");
  preview.src = url;

  processImageEntry(url);
  createMultipleGradients(url)
}

// Remove everything after the file extension.
// Example:
// Input: https://example.net/images/Feesh_2.png/revision/latest/
// Output: https://example.net/images/Feesh_2.png
function linkFilter(inputLink) {
  // Find the position of the last dot in the inputLink string
  const dotIndex = inputLink.lastIndexOf(".");

  // If there is no dot in the inputLink, return the original inputLink
  if (dotIndex === -1) {
    return inputLink;
  }

  // Find the position of the last forward slash after the dot
  const slashIndex = inputLink.indexOf("/", dotIndex);

  // If there is no forward slash after the dot, return the original inputLink
  if (slashIndex === -1) {
    return inputLink;
  }

  // Return the substring from the beginning of the inputLink to the position of the slash after the dot
  return inputLink.substring(0, slashIndex);
}

function handleLinkSubmission() {
  const corsProxy = "https://api.allorigins.win/raw?url=";
  var inputLink = document.getElementById("input-link").value;
  var filteredLink = linkFilter(inputLink);
  console.log({ filteredLink });

  clearContainers();

  const preview = document.getElementById("preview");

  // Try making a request without the proxy
  fetch(filteredLink, { mode: "cors" })
    .then((response) => {
      // If the response status is ok, set the preview source directly
      console.log({response});
      if (response.ok) {
        preview.src = filteredLink;
        processImageEntry(filteredLink);
        createMultipleGradients(filteredLink)
      } else {
        // If there is a CORS error, use the proxy server
        preview.src = corsProxy + filteredLink;
        processImageEntry(corsProxy + filteredLink);
        createMultipleGradients(corsProxy + filteredLink)
      }
    })
    .catch(() => {
      // If there is an error making the request, use the proxy server
      preview.src = corsProxy + filteredLink;
      processImageEntry(corsProxy + filteredLink);
      createMultipleGradients(corsProxy + filteredLink)
    });
}

function processImageEntry(imgUrl) {
  // Generate the tinted versions of the image and display them on the canvas
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgUrl;
  img.onload = function () {
    for (let i = 0; i < palette.length; i++) {
      const dataUrlResult = tintImage(img, palette[i]);
      const imgResult = document.createElement("img");
      imgResult.src = dataUrlResult;
      imgResult.classList.add(paletteNames[i]);

      // Make it clickable!
      imgResult.addEventListener("click", function () {
        console.log("Clicked!");
        imgView()
        document.getElementById("output-img").src = this.src;
        document.getElementById("color-label").textContent =
          this.classList[0].replace(/-/g, " ");
          document.getElementById("color-label").style.color = palette[i];
      });

      // Append the <img> elements to a container element
      const container = document.getElementById("tinted-images");
      container.appendChild(imgResult);
    }
  };
}

function createMultipleGradients(imgUrl){
  const img = new Image();
  img.src = imgUrl;
  img.crossOrigin = "anonymous";
    for(let i = 0; i < gradientPalette.length; i++){
      updateGradient(i, img, true, 0)
    }
}

// Copy/Save Collage start//

function saveCollage() {
  const images = document.querySelectorAll("#tinted-images img");
  const collageWidth = 4; 
  const collageHeight = Math.ceil(images.length / collageWidth);
  const singleImageWidth = images[0].naturalWidth;
  const singleImageHeight = images[0].naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = singleImageWidth * collageWidth;
  canvas.height = singleImageHeight * collageHeight;
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const x = (i % collageWidth) * singleImageWidth;
    const y = Math.floor(i / collageWidth) * singleImageHeight;
    ctx.drawImage(img, x, y, singleImageWidth, singleImageHeight);
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "collage.png";
  link.click();
}

function copyCollage() {
    const images = document.querySelectorAll("#tinted-images img");
    const collageWidth = 4;
    const collageHeight = Math.ceil(images.length / collageWidth);
    const singleImageWidth = images[0].naturalWidth;
    const singleImageHeight = images[0].naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = singleImageWidth * collageWidth;
    canvas.height = singleImageHeight * collageHeight;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const x = (i % collageWidth) * singleImageWidth;
      const y = Math.floor(i / collageWidth) * singleImageHeight;
      ctx.drawImage(img, x, y, singleImageWidth, singleImageHeight);
    }

    canvas.toBlob(function (blob) {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(
        function () {
          alert("Collage copied to clipboard!");
        },
        function (err) {
          console.error("Failed to copy collage: ", err);
        }
      );
    });
  }
  
  //end//