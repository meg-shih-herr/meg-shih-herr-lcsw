// Content Loader for Megan Shih, LCSW Website
// This file handles loading content from JSON files and populating the HTML

class ContentLoader {
    constructor() {
        this.contentCache = {};
    }

    async loadContent(pageName) {
        try {
            console.log(`Loading content for: ${pageName}`);
            // Add cache-busting parameter to ensure fresh content
            const cacheBuster = new Date().getTime();
            const response = await fetch(`content/${pageName}.json?v=${cacheBuster}`);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
            }
            const content = await response.json();
            this.contentCache[pageName] = content;
            console.log(`Successfully loaded content for: ${pageName}`, content);
            return content;
        } catch (error) {
            console.error('Error loading content:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                url: `content/${pageName}.json?v=${new Date().getTime()}`
            });
            console.error('This usually happens when opening files directly in browser (file:// protocol)');
            console.error('Please serve the files through a web server (e.g., http://localhost:8000)');
            console.error('CONTENT LOADING FAILED - No fallback content available');
            
            // Show user-friendly error message
            this.showContentLoadingError(pageName);
            return null;
        }
    }

    showContentLoadingError(pageName) {
        // Create a visible error message for users
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff6b6b;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 90%;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <strong>Content Loading Error</strong><br>
            Unable to load ${pageName} content. Please ensure you're viewing this site through a web server.<br>
            <small>Check the console for technical details.</small>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 10000);
    }

    populateMainPage() {
        console.log('Populating main page...');
        const content = this.contentCache['main-page'];
        if (!content) {
            console.error('No content found for main page');
            return;
        }

        // Hero section
        const heroTitle = document.querySelector('.hero-text h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');

        if (heroTitle) {
            heroTitle.textContent = content.hero.title;
            console.log('Updated hero title');
        } else {
            console.warn('Hero title element not found');
        }

        if (heroSubtitle) {
            heroSubtitle.textContent = content.hero.subtitle;
            console.log('Updated hero subtitle');
        } else {
            console.warn('Hero subtitle element not found');
        }

        if (heroButtons) {
            const primaryBtn = heroButtons.querySelector('.btn-primary');
            const secondaryBtn = heroButtons.querySelector('.btn-secondary');
            if (primaryBtn) primaryBtn.textContent = content.hero.buttons.primary;
            if (secondaryBtn) secondaryBtn.textContent = content.hero.buttons.secondary;
            console.log('Updated hero buttons');
        } else {
            console.warn('Hero buttons element not found');
        }

        // Therapy with me section
        const therapySection = document.querySelector('#about .content-wrapper');
        if (therapySection) {
            const title = therapySection.querySelector('h2');
            const contentDiv = therapySection.querySelector('.therapy-content');

            if (title) {
                title.textContent = content.therapyWithMe.title;
                console.log('Updated therapy section title');
            }
            if (contentDiv) {
                contentDiv.innerHTML = content.therapyWithMe.content.map(paragraph =>
                    `<p>${paragraph}</p>`
                ).join('');
                console.log('Updated therapy section content');
            }
        } else {
            console.warn('Therapy section not found');
        }

        // Services section
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            const title = servicesSection.querySelector('.section-title');
            if (title) {
                title.textContent = content.services.title;
                console.log('Updated services title');
            }

            const servicesGrid = servicesSection.querySelector('.services-grid');
            if (servicesGrid) {
                servicesGrid.innerHTML = content.services.services.map(service => {
                    const additionalClass = service.title === 'Modalities' ? ' modalities-card' : '';
                    return `
                        <div class="service-card${additionalClass}">
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                        </div>
                    `;
                }).join('');
                console.log('Updated services grid');
            }
        } else {
            console.warn('Services section not found');
        }

        // Education section
        const educationSection = document.querySelector('#education .content-wrapper');
        if (educationSection) {
            const title = educationSection.querySelector('h2');
            const list = educationSection.querySelector('.education-list');

            if (title) {
                title.textContent = content.education.title;
                console.log('Updated education title');
            }
            if (list) {
                list.innerHTML = content.education.items.map(item =>
                    `<li>${item}</li>`
                ).join('');
                console.log('Updated education list');
            }
        } else {
            console.warn('Education section not found');
        }

        // Experience section
        const experienceSection = document.querySelector('#experience .content-wrapper');
        if (experienceSection) {
            const title = experienceSection.querySelector('h2');
            const contentDiv = experienceSection.querySelector('p');

            if (title) {
                title.textContent = content.experience.title;
                console.log('Updated experience title');
            }
            if (contentDiv) {
                contentDiv.textContent = content.experience.content;
                console.log('Updated experience content');
            }
        } else {
            console.warn('Experience section not found');
        }

        // Outside office section
        const outsideSection = document.querySelector('#outside-office .content-wrapper');
        if (outsideSection) {
            const title = outsideSection.querySelector('h2');
            const contentDiv = outsideSection.querySelector('p');

            if (title) {
                title.textContent = content.outsideOffice.title;
                console.log('Updated outside office title');
            }
            if (contentDiv) {
                contentDiv.textContent = content.outsideOffice.content;
                console.log('Updated outside office content');
            }
        } else {
            console.warn('Outside office section not found');
        }

        // Policies section
        const policiesSection = document.querySelector('#policies .content-wrapper');
        if (policiesSection) {
            const title = policiesSection.querySelector('h2');
            const contentDiv = policiesSection.querySelector('.policies-content');

            if (title) {
                title.textContent = 'Policies';
                console.log('Updated policies section title');
            }
            if (contentDiv && content.policies) {
                contentDiv.innerHTML = `
                    <div id="fees" class="policy-item">
                        <h3>${content.policies.fees.title}</h3>
                        <div class="policy-content">
                            ${content.policies.fees.content.map(item => `<p>${item}</p>`).join('')}
                        </div>
                    </div>
                    
                    <div id="insurance" class="policy-item">
                        <h3>${content.policies.insurance.title}</h3>
                        <div class="policy-content">
                            ${content.policies.insurance.content.map(item => `<p>${item}</p>`).join('')}
                        </div>
                    </div>
                    
                    <div id="cancellation-policy" class="policy-item">
                        <h3>${content.policies.cancellationPolicy.title}</h3>
                        <div class="policy-content">
                            ${content.policies.cancellationPolicy.content.map(item => `<p>${item}</p>`).join('')}
                        </div>
                    </div>
                    
                    <div id="no-surprises-act" class="policy-item">
                        <h3>${content.policies.noSurprisesAct.title}</h3>
                        <div class="policy-content">
                            ${(() => {
                                let html = '';
                                let inList = false;
                                content.policies.noSurprisesAct.content.forEach(item => {
                                    if (item.startsWith('-')) {
                                        if (!inList) {
                                            html += '<ul>';
                                            inList = true;
                                        }
                                        html += `<li>${item.substring(1).trim()}</li>`;
                                    } else {
                                        if (inList) {
                                            html += '</ul>';
                                            inList = false;
                                        }
                                        html += `<p>${item}</p>`;
                                    }
                                });
                                if (inList) {
                                    html += '</ul>';
                                }
                                return html;
                            })()}
                        </div>
                    </div>
                `;
                console.log('Updated policies section content from JSON');
            } else {
                console.warn('Policies content not available or contentDiv not found');
            }
        } else {
            console.warn('Policies section not found');
        }

        // Contact preview section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const title = contactSection.querySelector('h2');
            const subtitle = contactSection.querySelector('p');
            const cards = contactSection.querySelector('.contact-options');

            if (title) {
                title.textContent = content.contactPreview.title;
                console.log('Updated contact preview title');
            }
            if (subtitle) {
                subtitle.textContent = content.contactPreview.subtitle;
                console.log('Updated contact preview subtitle');
            }

            if (cards) {
                cards.innerHTML = content.contactPreview.cards.map(card => `
                    <div class="contact-card">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                        <a href="${card.buttonLink}" class="btn-primary">${card.buttonText}</a>
                    </div>
                `).join('');
                console.log('Updated contact preview cards');
            }
        } else {
            console.warn('Contact preview section not found');
        }

        // Footer
        this.populateFooter(content.footer);
        console.log('Main page population complete');
    }

    populateContactPage() {
        console.log('Populating contact page...');
        const content = this.contentCache['contact-page'];
        if (!content) {
            console.error('No content found for contact page');
            return;
        }

        // Hero section
        const heroTitle = document.querySelector('.contact-hero-content h1');
        const heroSubtitle = document.querySelector('.contact-hero-content .hero-subtitle');

        if (heroTitle) {
            heroTitle.textContent = content.hero.title;
            console.log('Updated contact hero title');
        }
        if (heroSubtitle) {
            heroSubtitle.textContent = content.hero.subtitle;
            console.log('Updated contact hero subtitle');
        }

        // Contact info section
        const contactDetails = document.querySelector('.contact-details');
        if (contactDetails) {
            const title = contactDetails.querySelector('h2');
            if (title) {
                title.textContent = content.contactInfo.title;
                console.log('Updated contact info title');
            }

            const contactItems = contactDetails.querySelectorAll('.contact-item');
            content.contactInfo.sections.forEach((section, index) => {
                if (contactItems[index]) {
                    const h3 = contactItems[index].querySelector('h3');
                    const p = contactItems[index].querySelector('p');
                    const note = contactItems[index].querySelector('.note');

                    if (h3) h3.textContent = section.title;
                    if (p) {
                        if (section.title.includes('Email')) {
                            p.innerHTML = `<a href="mailto:${section.content}">${section.content}</a>`;
                        } else {
                            p.textContent = section.content;
                        }
                    }
                    if (note) {
                        note.textContent = section.note;
                        if (section.isEmergency) {
                            note.classList.add('emergency');
                        }
                    }
                }
            });
            console.log('Updated contact info sections');
        } else {
            console.warn('Contact details section not found');
        }

        // Form section
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
            const formTitle = formContainer.querySelector('h2');
            if (formTitle) {
                formTitle.textContent = content.form.title;
                console.log('Updated form title');
            }

            const form = formContainer.querySelector('.contact-form');
            if (form) {
                // Clear existing form fields (except submit button and note)
                const submitButton = form.querySelector('.form-submit');
                const formNote = form.querySelector('.form-note');
                const consentGroup = form.querySelector('.checkbox-group');

                // Remove existing form groups except consent and submit
                const formGroups = form.querySelectorAll('.form-group:not(.checkbox-group)');
                formGroups.forEach(group => group.remove());

                // Add form fields
                content.form.fields.forEach(field => {
                    const fieldGroup = document.createElement('div');
                    fieldGroup.className = 'form-group';

                    const label = document.createElement('label');
                    label.setAttribute('for', field.name);
                    label.textContent = field.label;

                    let input;
                    if (field.type === 'textarea') {
                        input = document.createElement('textarea');
                        input.setAttribute('rows', field.rows);
                        if (field.placeholder) {
                            input.setAttribute('placeholder', field.placeholder);
                        }
                    } else if (field.type === 'select') {
                        input = document.createElement('select');
                        field.options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.setAttribute('value', option.value);
                            optionElement.textContent = option.text;
                            input.appendChild(optionElement);
                        });
                    } else {
                        input = document.createElement('input');
                        input.setAttribute('type', field.type);
                        if (field.placeholder) {
                            input.setAttribute('placeholder', field.placeholder);
                        }
                    }

                    input.setAttribute('id', field.name);
                    input.setAttribute('name', field.name);
                    if (field.required) {
                        input.setAttribute('required', '');
                    }

                    fieldGroup.appendChild(label);
                    fieldGroup.appendChild(input);

                    // Insert before consent group
                    if (consentGroup) {
                        form.insertBefore(fieldGroup, consentGroup);
                    } else {
                        form.appendChild(fieldGroup);
                    }
                });

                // Update consent text
                if (consentGroup) {
                    const consentLabel = consentGroup.querySelector('.checkbox-label');
                    if (consentLabel) {
                        const textSpan = consentLabel.querySelector('span:not(.checkmark)');
                        if (textSpan) {
                            textSpan.textContent = content.form.consent.text;
                        }
                    }
                }

                // Update submit button
                if (submitButton) {
                    const buttonText = submitButton.querySelector('.button-text');
                    if (buttonText) buttonText.textContent = content.form.submitButton;
                }

                // Update form note
                if (formNote) {
                    formNote.innerHTML = `<strong>Please note:</strong> ${content.form.note}`;
                }
                console.log('Updated form fields');
            }
        } else {
            console.warn('Form container not found');
        }

        // FAQ section
        const faqSection = document.querySelector('.faq-section');
        if (faqSection) {
            const title = faqSection.querySelector('h2');
            if (title) {
                title.textContent = content.faq.title;
                console.log('Updated FAQ title');
            }

            const faqGrid = faqSection.querySelector('.faq-grid');
            if (faqGrid) {
                faqGrid.innerHTML = content.faq.questions.map(q => `
                    <div class="faq-item">
                        <h3>${q.question}</h3>
                        <p>${q.answer}</p>
                    </div>
                `).join('');
                console.log('Updated FAQ grid');
            }
        } else {
            console.warn('FAQ section not found');
        }

        // Footer
        this.populateFooter(content.footer);
        console.log('Contact page population complete');
    }

    populateBlogPost(postId) {
        console.log(`Populating blog post: ${postId}`);
        const content = this.contentCache['blog-posts'];
        if (!content) {
            console.error('No blog posts content found');
            return;
        }

        const post = content.posts.find(p => p.id === postId);
        if (!post) {
            console.error(`Blog post with id ${postId} not found`);
            return;
        }

        // Update page title
        const pageTitle = document.querySelector('title');
        if (pageTitle) {
            pageTitle.textContent = `${post.title} | Megan Shih, LCSW`;
        }

        // Update post header
        const postHeader = document.querySelector('.post-header');
        if (postHeader) {
            const title = postHeader.querySelector('h1');
            const date = postHeader.querySelector('.post-date');
            const category = postHeader.querySelector('.post-category');

            if (title) title.textContent = post.title;
            if (date) date.textContent = post.date;
            if (category) category.textContent = post.category;
        }

        // Update post content
        const postContent = document.querySelector('.post-content');
        if (postContent) {
            postContent.innerHTML = post.content.map(item => {
                switch (item.type) {
                    case 'paragraph':
                        return `<p>${item.text}</p>`;
                    case 'heading':
                        return `<h2>${item.text}</h2>`;
                    case 'subheading':
                        return `<h3>${item.text}</h3>`;
                    default:
                        return `<p>${item.text}</p>`;
                }
            }).join('');
        }
        console.log('Blog post population complete');
    }

    populateFooter(footerContent) {
        const footer = document.querySelector('.footer');
        if (!footer || !footerContent) return;

        const footerSections = footer.querySelectorAll('.footer-section');

        // Main info section
        if (footerSections[0]) {
            const h3 = footerSections[0].querySelector('h3');
            const p1 = footerSections[0].querySelector('p:first-of-type');
            const p2 = footerSections[0].querySelector('p:last-of-type');

            if (h3) h3.textContent = footerContent.mainInfo.name;
            if (p1) p1.textContent = footerContent.mainInfo.description;
            if (p2) p2.textContent = footerContent.mainInfo.license;
        }

        // Contact section (now at index 1 since we removed services and information sections)
        if (footerSections[1]) {
            const p1 = footerSections[1].querySelector('p:first-of-type');
            const p2 = footerSections[1].querySelector('p:last-of-type');

            if (p1) p1.textContent = footerContent.contact.location;
            if (p2) p2.innerHTML = `Email: <a href="mailto:${footerContent.contact.email}">${footerContent.contact.email}</a>`;
        }
        console.log('Footer population complete');
    }
}

// Initialize content loader
const contentLoader = new ContentLoader();

// Load content based on current page
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, starting content population...');
    const currentPage = window.location.pathname;
    console.log('Current page:', currentPage);

    if (currentPage.includes('contact.html')) {
        console.log('Loading contact page content...');
        const content = await contentLoader.loadContent('contact-page');
        if (content) {
            contentLoader.populateContactPage();
        } else {
            console.error('Failed to load contact page content, skipping population');
        }
    } else if (currentPage.includes('blog/') && currentPage.includes('.html')) {
        console.log('Loading blog post content...');
        const content = await contentLoader.loadContent('blog-posts');
        if (content) {
            // Extract post ID from URL
            const postId = currentPage.split('/').pop().replace('.html', '');
            contentLoader.populateBlogPost(postId);
        } else {
            console.error('Failed to load blog posts content, skipping population');
        }
    } else {
        // Main page
        console.log('Loading main page content...');
        const content = await contentLoader.loadContent('main-page');
        if (content) {
            contentLoader.populateMainPage();
        } else {
            console.error('Failed to load main page content, skipping population');
        }
    }
});