document.addEventListener('DOMContentLoaded', () => {
    // MENU DRAWER CLOSE JS START
    const closeButton = document.querySelector('.menu-drawer__menu .icon-close');
    const overlay = document.querySelector('.menu-drawer__overlay');

    if (closeButton && overlay) {
        closeButton.addEventListener('click', () => {
            console.log('close clicked===============');
            document.getElementById("Details-menu-drawer-container").removeAttribute("open");
            document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
            document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
        });

        overlay.addEventListener('click', () => {
            console.log('overlay clicked===============');
            document.getElementById("Details-menu-drawer-container").removeAttribute("open");
            document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
            document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
        });
    } else {
        console.error('Elements not found');
    }

    // MENU DRAWER CLOSE JS END

    // TOGGLE SWITCH JS START

    // Add event listener to toggle dark mode
    document.getElementById('modeToggle')?.addEventListener('change', function() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
    // Apply dark mode on initial page load
    applyDarkMode();

    function applyDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;

        if (isDarkMode) {
            body.classList.add('dark-mode');
            modeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            modeToggle.checked = false;
        }
    }

    // TOGGLE SWITCH JS END

    // EXTRA STRAP MODAL OPEN/CLOSE JS START

    document.querySelector(".product-block--strap_heading").addEventListener("click", function() {
        document.querySelector(".strap_modal").style.display = "block";
        document.querySelector(".strap_modal").classList.add("active");
        document.querySelector(".strap_modal_overlay").classList.add("active");
        document.querySelector("body").classList.add("overflow-hidden");
        addonStrapFlickitySliderInitialize();
    });

    document.querySelector(".strap_modal .close").addEventListener("click", function() {
        document.querySelector(".strap_modal").style.display = "none";
        document.querySelector(".strap_modal").classList.remove("active");
        document.querySelector(".strap_modal_overlay").classList.remove("active");
        document.querySelector("body").classList.remove("overflow-hidden");
        addonStrapFlickitySliderDestroy();
    });

    document.querySelector(".strap_modal_overlay").addEventListener("click", function() {
        document.querySelector(".strap_modal").classList.remove("active");
        document.querySelector(".strap_modal").style.display = "none";
        this.classList.remove("active");
        document.querySelector("body").classList.remove("overflow-hidden");
        addonStrapFlickitySliderDestroy();
    });

    // EXTRA STRAP MODAL OPEN/CLOSE JS END

    // ADDON ITEM FLICKITY SLIDER JS START

    function addonStrapFlickitySliderInitialize(){
        // Initialize Flickity
        var elem = document.querySelector('.product-addon--block');

        var flkty = new Flickity(elem, {
            // options
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            // other options as needed
        });
    }

    function addonStrapFlickitySliderDestroy(){
        // Initialize Flickity
        var elem = document.querySelector('.product-addon--block');
        
        var flkty = new Flickity(elem, {
            // options
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            // other options as needed
        });

        flkty.destroy();
    }

    // ADDON ITEM FLICKITY SLIDER JS END

    document.querySelectorAll('.specs-block-title').forEach(function(title) {
        title.addEventListener('click', function() {
            var closeParentItem = title.closest('.specs-blocks-item');
            var parentItems = document.querySelectorAll('.specs-blocks-item');

            if (!closeParentItem.classList.contains('active')) {
                parentItems.forEach(function(item) {
                    item.classList.remove('active');
                });
                closeParentItem.classList.add('active');
            } else {
                parentItems.forEach(function(item) {
                    item.classList.remove('active');
                });
            }
        });
    });



    // STRAP ENGINE OBJECT
    const strapEngine = (function(){

        const params = {
            data : null,
            jsonRowData: null,
            jsonData: [],
            selectedCollection: '',
            selectedModel: '',
        }

        const int = () => {
            
            console.log('strap init');

            // testing result 
            testingCode();

            // add output contianer
            document.body.insertAdjacentHTML('beforeend', '<div class="strapenginescreen"><div class="strapengine"></div></div>');
           
            readData();
        }



        const testingCode = () => {

            const styles = `
            .strapenginescreen {
               position: absolute;
               top: 10em;
               left: 50%;
               transform: translateX(-50%);
               background-color: #fff;
               border: 1px solid;
               z-index: 999;
               padding: 2em;
               }
           `;             

           document.body.insertAdjacentHTML('beforeend', `<style>${styles}</style>`); 

        }


        const readData = () => {

            const sheetUrl = 'https://docs.google.com/spreadsheets/d/1-x59uEuFZVtK-tZoUSn4koPptZ2YAiFmLeskw9eA4E4/pub?gid=0&single=true&output=csv';

            fetch(sheetUrl)
                .then(response => response.text())
                .then(csv => {
                    // Convert CSV to JSON
                    const json = csvToJson(csv);

                    params.data = csv;
                    params.jsonRowData = json;
                    params.jsonData = groupByIdentifier(params.jsonRowData);

                    //console.log(params.jsonData);

                    buildFirstSelect();
                    buildSecondSelect();
                    buildThirdSelect();

                })
                .catch(error => console.error('Error fetching data:', error));

        }

        // build collection select (1st)
        const buildFirstSelect = () => {

            const colSelect = document.createElement('select');
            for (let identifier in params.jsonData){
                let colOption = document.createElement('option');
                colOption.value = params.jsonData[identifier].Identifier;
                colOption.text = params.jsonData[identifier].Collection;
                colSelect.appendChild(colOption);
            }

            document.querySelectorAll('.strapengine')[0].appendChild(wrapInDiv(colSelect));
            params.selectedCollection = colSelect.value;

            colSelect.addEventListener('change',(evt)=>{
                params.selectedCollection = colSelect.value;
                document.querySelectorAll('.modelSelect')[0].remove();  // remove model select and rebuild
                document.querySelectorAll('.strapSelect')[0].remove();  // remove strap select and rebuild
                buildSecondSelect();    
                buildThirdSelect();                                 
            });

        }

        // build model select (2nd)
        const buildSecondSelect = () => {

            const colSelect = document.createElement('select');
            const models = params.jsonData[params.selectedCollection].Models;
            colSelect.setAttribute('class', 'modelSelect');


            for (let identifier in models){
                let colOption = document.createElement('option');
                let name = models[identifier]['Model Name'];
                colOption.value = name;
                colOption.text = name;
                colSelect.appendChild(colOption);
            }

            document.querySelectorAll('.strapengine')[0].appendChild(wrapInDiv(colSelect));
            params.selectedModel = colSelect.value;

            colSelect.addEventListener('change',(evt)=>{
                params.selectedModel = colSelect.value;
                document.querySelectorAll('.strapSelect')[0].remove();  // remove strap select and rebuild
                buildThirdSelect();                                    // build strap select
            });

        }

        // build model select (3rd)
        const buildThirdSelect = () => {
            const colSelect = document.createElement('select');
            const models = params.jsonData[params.selectedCollection].Models;
            const strapCollection = models[params.selectedModel]?.['StrapCollection'];
            colSelect.setAttribute('class', 'strapSelect');

            const option = document.createElement('option');
            option.value = strapCollection;
            option.text  = strapCollection;
            colSelect.appendChild(option);
            document.querySelectorAll('.strapengine')[0].appendChild(wrapInDiv(colSelect));

        }

        const wrapInDiv = (obj) => {
            const div = document.createElement('div');
            div.appendChild(obj);
            return div;
        }

        const groupByIdentifier = (data) => {
            return data.reduce((result, item) => {
                const id = item['Identifier'];
                const discontinuedCollection = item['Discontinued collection'] || 'False';
                const collection = item['Collection name'];
                const modelName = item['Model name'];
                const discontinuedModel = item ['Discontinued model'];

                // Initialize the identifier entry if it doesn't exist
                if (!result[id]) {
                    result[id] = { Identifier: id, Collection: collection, dicontinued: discontinuedCollection ,Models: {} };
                }
        
                // Initialize the model entry if it doesn't exist
                if (modelName && !result[id].Models[modelName]) {
                    result[id].Models[modelName] = {
                        'Model Name': modelName,
                        'Discontinued' : discontinuedModel || 'False',
                        'Image': item['Image'] || '',
                        'Lugs Width': item['Lugs width'] || '',  
                        'Model Size': item['Model size'] || '',
                        'StrapCollection': item['Strap collection'] || ''
                    };
                }

                return result;
            }, {});
        }

        /**
         * Convert CSV to JSON
         * @param {string} csv - CSV data as a string
         * @returns {Object[]} - Array of JSON objects
         */
        const csvToJson = (csv) => {
            const lines = csv.split('\n');
            const headers = lines[0].split(',');

            return lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header.trim()] = values[i].trim();
                    return obj;
                }, {});
            });
        }


        return {
            int:int
        }


    })();

    strapEngine.int();


});
