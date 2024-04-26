       const defaultLocale = "en";

            let translations = {};
            
            document.addEventListener("DOMContentLoaded", () => {
           
              const savedLocale = localStorage.getItem("locale");
              const initialLocale = savedLocale || defaultLocale;
              setLocale(initialLocale);
            });
            const direction = document.body.getAttribute('dir');
            if (direction === "rtl") {
            
                const elements = document.querySelectorAll('.slideInLeft');
        
                elements.forEach(element => {
                    element.classList.remove('slideInLeft');
                    element.classList.add('slideInRight');
                });
            }
            const switcher = document.getElementById("lang-switcher");
            const activeLangDisplay = document.getElementById("active-lang");
            
            switcher.onclick = () => {
              const newLocale = activeLangDisplay.textContent === "Ar" ? "en" : "ar";
              setLocale(newLocale);
              location.reload()
            };
            
            const setLocale = async (newLocale) => {
              translations = await fetchTranslations(newLocale);
            
              // Save the new locale to local storage
              localStorage.setItem("locale", newLocale);
            
              activeLangDisplay.textContent = newLocale === "ar" ? "Ar" : "En";
              
              if(newLocale === "ar") {
                document.documentElement.setAttribute('dir', 'rtl');
                document.body.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'ar');
              } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.body.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
              }
            
              translatePage();
            };
            
            const fetchTranslations = async (newLocale) => {
              const response = await fetch(`lang/${newLocale}.json`);
            
              if (!response.ok) {
                console.log(`Could not fetch translations for locale ${newLocale}`);
                return {};
              }
            
              return await response.json();
            };
            
            function translatePage() {
              document.querySelectorAll("[localization-key]").forEach((element) => {
                let key = element.getAttribute("localization-key");
                let translation = translations[key] || key;
                element.innerText = translation;
              });
            };