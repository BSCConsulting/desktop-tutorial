// Comprehensive Beauty Advisor Chatbot for Aura Beauty Studio
// Optimized for Hostinger deployment

class AuraBeautyBot {
    constructor() {
        this.isOpen = false;
        this.currentFlow = null;
        this.userSkinType = null;
        this.userName = null;
        this.conversationContext = {};
        this.beautyKnowledgeBase = this.initializeKnowledgeBase();
        
        // Initialize with error handling
        this.init();
    }

    init() {
        try {
            console.log('Initializing Aura Beauty Bot...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        } catch (error) {
            console.error('Chatbot initialization error:', error);
        }
    }

    setup() {
        try {
            this.createChatWidget();
            this.setupEventListeners();
            console.log('Aura Beauty Bot initialized successfully!');
        } catch (error) {
            console.error('Chatbot setup error:', error);
        }
    }

    initializeKnowledgeBase() {
        return {
            // Greetings
            greetings: {
                patterns: [
                    'hi', 'hello', 'hey', 'hii', 'hiii', 'helloo', 'helo', 'hellow',
                    'good morning', 'good afternoon', 'good evening', 'good night',
                    'morning', 'afternoon', 'evening', 'night', 'namaste', 'namaskar',
                    'hola', 'sup', 'wassup', 'whatsup', 'start', 'begin'
                ],
                response: "Hi there! 👋 Welcome to Aura Beauty Studio—your destination for beauty and self-care.<br><br>I'm your virtual beauty assistant with expertise in skincare, haircare, makeup, and everything beauty! How can I make your day better?<br><br>You can ask me about products, beauty advice, orders, routines, tips, or anything else! ✨"
            },

            // Order & Shipping
            orderShipping: {
                patterns: [
                    'where is my order', 'track order', 'order status', 'tracking', 'delivery status',
                    'when will my order arrive', 'parcel missing', 'package not received', 'order late',
                    'shipping time', 'delivery timeline', 'how long shipping', 'when will i get',
                    'dispatch', 'shipped', 'delivered', 'courier', 'logistics', 'transit',
                    'order eta', 'parcel eta', 'delivery eta', 'expected delivery',
                    'my package', 'my parcel', 'my order', 'order update', 'shipping update'
                ],
                response: "We ship pan-India from Bangalore, Hyderabad, Vijayawada, and Dehradun. Orders go out within 24 hours, and delivery takes 2–5 business days. 📦<br><br>Tracking links are sent via email or SMS after purchase—share your order ID if you need a direct update!<br><br>Need anything else? ✨"
            },

            // Returns & Refunds
            returns: {
                patterns: [
                    'return', 'refund', 'send back', 'money back', 'exchange', 'replace',
                    'not satisfied', 'dont like', "don't like", 'cancel order', 'cancellation',
                    'return policy', 'refund policy', 'can i return', 'how to return',
                    'get money back', 'product return', 'item return', 'send it back',
                    'unhappy with product', 'wrong product', 'damaged product'
                ],
                response: "We do not accept returns due to hygiene and safety. Please read product details before purchase.<br><br>Have another question or need help picking a product? I'm here to make sure you choose something you'll absolutely love! 💕"
            },

            // Payment Methods
            payments: {
                patterns: [
                    'payment', 'pay', 'upi', 'card', 'credit card', 'debit card', 'cod',
                    'cash on delivery', 'emi', 'pay later', 'secure', 'safe payment',
                    'how to pay', 'payment options', 'payment methods', 'checkout',
                    'payment security', 'is payment safe', 'payment gateway',
                    'paytm', 'gpay', 'phonepe', 'razorpay', 'visa', 'mastercard'
                ],
                response: "We accept UPI, all major debit/credit cards, and cash on delivery. All payments are 100% secure! 🔒<br><br>Currently, we don't offer EMI/Pay Later, but we're working on adding these options soon.<br><br>Ready to shop? Let me help you find something amazing! 💳"
            },

            // Skincare Advice
            skincare: {
                oily: {
                    patterns: [
                        'oily skin', 'oil control', 'greasy skin', 'shiny skin', 'excess oil',
                        'sebum control', 'oily t zone', 'combination oily', 'acne prone oily'
                    ],
                    response: "Perfect! For oily skin, here are my top recommendations! ✨<br><br><strong>Oil Control Heroes:</strong><br>• <strong>Gentle Foaming Cleanser</strong> - Deep cleans without over-drying<br>• <strong>Men's Oil Control Face Wash</strong> - Controls excess sebum<br>• <strong>Hydra Glow Hyaluronic Moisturizer</strong> - Lightweight, non-greasy hydration<br>• <strong>Radiance Vitamin C Face Serum</strong> - Brightens while controlling oil<br>• <strong>Ultra-Light Sunscreen SPF 50</strong> - Non-comedogenic protection<br><br><strong>Pro Tip:</strong> Don't skip moisturizer! Oily skin needs hydration too. 💡"
                },
                dry: {
                    patterns: [
                        'dry skin', 'dehydrated', 'flaky skin', 'tight skin', 'rough skin',
                        'skin dryness', 'moisture barrier', 'hydration', 'parched skin'
                    ],
                    response: "Dry skin needs extra love! Here are my hydrating heroes: 💧<br><br><strong>Moisture Boosters:</strong><br>• <strong>Gentle Foaming Cleanser</strong> - Won't strip natural oils<br>• <strong>Hydra Glow Hyaluronic Moisturizer</strong> - Intense hydration boost<br>• <strong>Revive Night Repair Cream</strong> - Overnight nourishment<br>• <strong>Radiance Vitamin C Face Serum</strong> - Hydrating glow booster<br>• <strong>Cherry Tinted Lip Balm</strong> - For soft, hydrated lips<br><br><strong>Pro Tip:</strong> Apply moisturizer to damp skin for maximum absorption! 💡"
                },
                acne: {
                    patterns: [
                        'acne', 'pimple', 'breakout', 'spots', 'blemish', 'acne prone',
                        'blackheads', 'whiteheads', 'cystic acne', 'hormonal acne'
                    ],
                    response: "Acne can be so frustrating, but I've got your back! 💪<br><br><strong>Acne-Fighting Squad:</strong><br>• <strong>Gentle Foaming Cleanser</strong> - Won't over-dry or irritate<br>• <strong>Men's Oil Control Face Wash</strong> - Deep pore cleansing<br>• <strong>Radiance Vitamin C Face Serum</strong> - Healing & brightening<br>• <strong>Ubtan De-Tan Face Pack</strong> - Weekly deep cleanse<br><br><strong>Pro Tips:</strong><br>✨ Never pick at breakouts<br>✨ Use gentle, consistent routine<br>✨ Always follow with moisturizer"
                }
            },

            // Haircare
            haircare: {
                hairfall: {
                    patterns: [
                        'hair fall', 'hair loss', 'thinning hair', 'weak hair', 'hair growth',
                        'balding', 'hair breakage', 'hair shedding', 'receding hairline'
                    ],
                    response: "Hair fall is so common, but these products work wonders! 💇‍♀️<br><br><strong>Hair Strengthening Heroes:</strong><br>• <strong>Onion & Biotin Hair Growth Shampoo</strong> - Promotes growth<br>• <strong>Nourish & Repair Hair Oil</strong> - Strengthens roots<br>• <strong>Protein Repair Hair Mask</strong> - Weekly treatment<br>• <strong>Anti-Dandruff Scalp Serum</strong> - Healthy scalp = healthy hair<br><br><strong>Pro Tips:</strong><br>✨ Massage scalp daily<br>✨ Use lukewarm water<br>✨ Be gentle when wet"
                },
                dandruff: {
                    patterns: [
                        'dandruff', 'flaky scalp', 'itchy scalp', 'dry scalp', 'scalp issues',
                        'white flakes', 'scalp irritation', 'seborrheic dermatitis'
                    ],
                    response: "Let's get that scalp healthy and flake-free! 🌿<br><br><strong>Scalp Saviors:</strong><br>• <strong>Anti-Dandruff Scalp Serum</strong> - Tea tree & rosemary magic<br>• <strong>Onion & Biotin Hair Growth Shampoo</strong> - Gentle cleansing<br>• <strong>Nourish & Repair Hair Oil</strong> - Soothes irritation<br><br><strong>Pro Tips:</strong><br>✨ Don't scratch - it makes it worse<br>✨ Use lukewarm water<br>✨ Consistent treatment is key"
                }
            },

            // Beauty Tips
            beautyTips: {
                glowing: {
                    patterns: [
                        'glowing skin', 'radiant skin', 'skin glow', 'bright skin',
                        'luminous skin', 'healthy glow', 'dewy skin', 'glass skin'
                    ],
                    response: "Want that enviable glow? Here's my secret formula! ✨<br><br><strong>Glow-Getting Routine:</strong><br>🌅 <strong>Morning:</strong><br>• Gentle cleanser<br>• Vitamin C serum<br>• Moisturizer<br>• Sunscreen (non-negotiable!)<br><br>🌙 <strong>Evening:</strong><br>• Double cleanse<br>• Hydrating serum<br>• Night cream<br><br>🗓️ <strong>Weekly:</strong><br>• Exfoliate gently<br>• Face mask<br><br><strong>Pro Tips:</strong><br>✨ Hydration from inside out - drink water!<br>✨ Sleep 7-8 hours<br>✨ Consistency beats perfection"
                },
                routine: {
                    patterns: [
                        'skincare routine', 'layering products', 'skincare order', 'how to layer',
                        'morning routine', 'evening routine', 'skincare steps'
                    ],
                    response: "Perfect layering = maximum results! Here's the golden rule: 📏<br><br><strong>Correct Order (thinnest to thickest):</strong><br>1️⃣ <strong>Cleanser</strong> - Clean canvas<br>2️⃣ <strong>Toner/Mist</strong> - Prep skin<br>3️⃣ <strong>Serum</strong> - Active ingredients<br>4️⃣ <strong>Moisturizer</strong> - Lock it in<br>5️⃣ <strong>Sunscreen</strong> - AM only<br><br><strong>Pro Tips:</strong><br>✨ Wait 30 seconds between layers<br>✨ Less is more - don't overload<br>✨ Patch test new products"
                }
            },

            // Product Safety
            productSafety: {
                patterns: [
                    'dermatologist tested', 'safe', 'safety', 'doctor approved', 'clinically tested',
                    'ingredients', 'parabens', 'sulphates', 'sulfates', 'chemicals',
                    'natural', 'organic', 'harmful ingredients', 'allergic reaction'
                ],
                response: "Safety first, always! Here's what makes our products special: 👩‍⚕️<br><br><strong>Our Safety Standards:</strong><br>✅ All products dermatologist-tested<br>✅ Free from harmful parabens & sulphates<br>✅ Cruelty-free formulations<br>✅ Suitable for Indian skin & climate<br><br><strong>Pro Tips:</strong><br>✨ Always patch test new products<br>✨ Read ingredient lists if you have allergies<br>✨ Start slow with active ingredients"
            }
        };
    }

    createChatWidget() {
        try {
            // Check if widget already exists
            if (document.getElementById('chatButton')) {
                return;
            }

            const chatWidget = document.createElement('div');
            chatWidget.innerHTML = `
                <!-- Chat Button -->
                <div id="chatButton" class="chat-button" role="button" tabindex="0" aria-label="Open beauty advisor chat">
                    <i class="fas fa-comments"></i>
                    <span class="chat-notification">💬</span>
                </div>

                <!-- Chat Window -->
                <div id="chatWindow" class="chat-window">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="bot-avatar">💄</div>
                            <div>
                                <div class="bot-name">Beauty Expert</div>
                                <div class="bot-status">Your personal beauty advisor ✨</div>
                            </div>
                        </div>
                        <button id="closeChatBtn" class="close-chat-btn" aria-label="Close chat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="chatMessages" class="chat-messages" role="log" aria-live="polite">
                        <div class="message bot-message">
                            <div class="bot-avatar">💄</div>
                            <div class="message-content">
                                Hi there! 👋 Welcome to Aura Beauty Studio—your destination for beauty and self-care.<br><br>
                                I'm your virtual beauty assistant with expertise in skincare, haircare, makeup, and everything beauty! How can I make your day better?<br><br>
                                You can ask me about products, beauty advice, orders, routines, tips, or anything else! ✨
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" id="chatInput" placeholder="Ask me anything about beauty..." autocomplete="off" />
                        <button id="sendBtn" class="send-btn" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    <div class="quick-actions">
                        <button class="quick-btn" data-action="skin-routine">Perfect Routine for My Skin</button>
                        <button class="quick-btn" data-action="product-finder">Find Products for Me</button>
                        <button class="quick-btn" data-action="beauty-tips">Beauty Tips & Advice</button>
                        <button class="quick-btn" data-action="bestsellers">Show Bestsellers</button>
                    </div>
                </div>
            `;

            document.body.appendChild(chatWidget);
            console.log('Chat widget created successfully!');
        } catch (error) {
            console.error('Chat widget creation error:', error);
        }
    }

    setupEventListeners() {
        try {
            const chatButton = document.getElementById('chatButton');
            const closeChatBtn = document.getElementById('closeChatBtn');
            const chatInput = document.getElementById('chatInput');
            const sendBtn = document.getElementById('sendBtn');

            if (chatButton) {
                chatButton.addEventListener('click', () => this.toggleChat());
                chatButton.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleChat();
                    }
                });
            }
            
            if (closeChatBtn) {
                closeChatBtn.addEventListener('click', () => this.toggleChat());
            }
            
            if (sendBtn) {
                sendBtn.addEventListener('click', () => this.sendMessage());
            }
            
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
            }

            // Quick action buttons
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('quick-btn')) {
                    const action = e.target.getAttribute('data-action');
                    this.handleQuickAction(action);
                }
            });

            console.log('Event listeners set up successfully!');
        } catch (error) {
            console.error('Event listener setup error:', error);
        }
    }

    toggleChat() {
        try {
            const chatWindow = document.getElementById('chatWindow');
            const chatButton = document.getElementById('chatButton');
            
            if (!chatWindow || !chatButton) return;
            
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                chatWindow.style.display = 'flex';
                chatButton.style.display = 'none';
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 100);
                }
            } else {
                chatWindow.style.display = 'none';
                chatButton.style.display = 'flex';
            }
        } catch (error) {
            console.error('Toggle chat error:', error);
        }
    }

    sendMessage() {
        try {
            const chatInput = document.getElementById('chatInput');
            if (!chatInput) return;
            
            const message = chatInput.value.trim();
            
            if (!message) return;
            
            this.addMessage(message, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.processMessage(message);
            }, 800);
        } catch (error) {
            console.error('Send message error:', error);
        }
    }

    addMessage(content, sender) {
        try {
            const chatMessages = document.getElementById('chatMessages');
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot') {
                messageDiv.innerHTML = `
                    <div class="bot-avatar">💄</div>
                    <div class="message-content">${content}</div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">${content}</div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error('Add message error:', error);
        }
    }

    showTypingIndicator() {
        try {
            const chatMessages = document.getElementById('chatMessages');
            if (!chatMessages) return;
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="bot-avatar">💄</div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error('Show typing indicator error:', error);
        }
    }

    hideTypingIndicator() {
        try {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        } catch (error) {
            console.error('Hide typing indicator error:', error);
        }
    }

    processMessage(message) {
        try {
            const lowerMessage = message.toLowerCase();
            
            // Handle greetings first
            if (this.matchesPatterns(lowerMessage, this.beautyKnowledgeBase.greetings.patterns)) {
                this.addMessage(this.beautyKnowledgeBase.greetings.response, 'bot');
                this.addFollowUp();
                return;
            }

            // Search through knowledge base
            if (this.searchKnowledgeBase(lowerMessage)) {
                return;
            }

            // Fallback
            this.handleFallback();
        } catch (error) {
            console.error('Process message error:', error);
            this.handleFallback();
        }
    }

    searchKnowledgeBase(message) {
        try {
            // Check order & shipping
            if (this.matchesPatterns(message, this.beautyKnowledgeBase.orderShipping.patterns)) {
                this.addMessage(this.beautyKnowledgeBase.orderShipping.response, 'bot');
                this.addFollowUp();
                return true;
            }

            // Check returns
            if (this.matchesPatterns(message, this.beautyKnowledgeBase.returns.patterns)) {
                this.addMessage(this.beautyKnowledgeBase.returns.response, 'bot');
                this.addFollowUp();
                return true;
            }

            // Check payments
            if (this.matchesPatterns(message, this.beautyKnowledgeBase.payments.patterns)) {
                this.addMessage(this.beautyKnowledgeBase.payments.response, 'bot');
                this.addFollowUp();
                return true;
            }

            // Check product safety
            if (this.matchesPatterns(message, this.beautyKnowledgeBase.productSafety.patterns)) {
                this.addMessage(this.beautyKnowledgeBase.productSafety.response, 'bot');
                this.addFollowUp();
                return true;
            }

            // Check skincare
            for (const [type, data] of Object.entries(this.beautyKnowledgeBase.skincare)) {
                if (this.matchesPatterns(message, data.patterns)) {
                    this.addMessage(data.response, 'bot');
                    this.addFollowUp();
                    return true;
                }
            }

            // Check haircare
            for (const [type, data] of Object.entries(this.beautyKnowledgeBase.haircare)) {
                if (this.matchesPatterns(message, data.patterns)) {
                    this.addMessage(data.response, 'bot');
                    this.addFollowUp();
                    return true;
                }
            }

            // Check beauty tips
            for (const [type, data] of Object.entries(this.beautyKnowledgeBase.beautyTips)) {
                if (this.matchesPatterns(message, data.patterns)) {
                    this.addMessage(data.response, 'bot');
                    this.addFollowUp();
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Search knowledge base error:', error);
            return false;
        }
    }

    matchesPatterns(message, patterns) {
        try {
            return patterns.some(pattern => {
                return message.includes(pattern.toLowerCase());
            });
        } catch (error) {
            console.error('Pattern matching error:', error);
            return false;
        }
    }

    handleQuickAction(action) {
        try {
            switch (action) {
                case 'skin-routine':
                    this.addMessage(
                        "I'd love to create the perfect routine for you! 💕<br><br>What's your skin type?<br>• Oily<br>• Dry<br>• Combination<br>• Sensitive<br>• Normal<br><br>Just tell me and I'll create a customized routine! ✨",
                        'bot'
                    );
                    break;
                case 'product-finder':
                    this.addMessage(
                        "I'd love to find the perfect products for you! 💕<br><br>Tell me what you're looking for:<br>• Specific concern (acne, dryness, aging, etc.)<br>• Product type (cleanser, serum, moisturizer, etc.)<br>• Skin/hair type<br><br>The more you tell me, the better I can help! ✨",
                        'bot'
                    );
                    break;
                case 'beauty-tips':
                    this.addMessage(this.beautyKnowledgeBase.beautyTips.glowing.response, 'bot');
                    break;
                case 'bestsellers':
                    this.showBestsellers();
                    break;
            }
        } catch (error) {
            console.error('Quick action error:', error);
        }
    }

    showBestsellers() {
        try {
            this.addMessage(
                "Here are our absolute customer favorites! These are flying off the shelves: 🔥<br><br><strong>🌟 Top Bestsellers:</strong><br>• <strong>Radiance Vitamin C Face Serum</strong> - For that enviable glow! ₹599<br>• <strong>Hydra Glow Hyaluronic Moisturizer</strong> - Ultimate hydration hero ₹499<br>• <strong>Gentle Foaming Cleanser</strong> - Perfect for all skin types ₹349<br>• <strong>Onion & Biotin Hair Growth Shampoo</strong> - Hair growth miracle ₹399<br>• <strong>Ultra-Light Sunscreen SPF 50</strong> - Daily protection essential ₹399<br><br><strong>Why customers love these:</strong><br>✨ Proven results<br>✨ Suitable for Indian skin & climate<br>✨ Dermatologist-tested<br>✨ Amazing value for money<br><br>Want details on any of these beauties? 💕",
                'bot'
            );
        } catch (error) {
            console.error('Show bestsellers error:', error);
        }
    }

    addFollowUp() {
        try {
            setTimeout(() => {
                const followUps = [
                    "Anything else I can help you with about beauty, self-care, or your order? I'm here for you! 💕",
                    "Have more questions? I love talking beauty and helping you glow! ✨",
                    "Need more advice or want to explore other products? I'm your beauty BFF! 💄"
                ];
                
                const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
                this.addMessage(randomFollowUp, 'bot');
            }, 2000);
        } catch (error) {
            console.error('Add follow up error:', error);
        }
    }

    handleFallback() {
        try {
            this.addMessage(
                "That's a great question! I want to give you the best answer. For this specific question, our beauty experts can help you better. 💕<br><br><strong>Connect with our beauty experts:</strong><br><br>📱 <strong>WhatsApp:</strong> <a href='https://wa.me/918008893024' target='_blank' rel='noopener noreferrer' style='color: #25D366; font-weight: bold;'>Chat now!</a><br><br>📧 <strong>Email:</strong> <a href='mailto:aurabeautystudio96@gmail.com' style='color: #e91e63; font-weight: bold;'>aurabeautystudio96@gmail.com</a><br><br>📞 <strong>Phone:</strong> <a href='tel:+918008893024' style='color: #e91e63; font-weight: bold;'>+91-8008893024</a><br><br>Meanwhile, I'm here for skincare advice, product recommendations, beauty tips, and order support! ✨",
                'bot'
            );
        } catch (error) {
            console.error('Fallback error:', error);
        }
    }
}

// Initialize chatbot with error handling
try {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing chatbot...');
            new AuraBeautyBot();
        });
    } else {
        console.log('DOM already loaded, initializing chatbot...');
        new AuraBeautyBot();
    }
} catch (error) {
    console.error('Chatbot initialization failed:', error);
}