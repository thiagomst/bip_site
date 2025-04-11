document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.session_6_parceiros_div');
    const items = document.querySelectorAll('.session_6_parceiros_foto');
    
    if (items.length < 2) return;

    // 1. Configuração inicial
    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'session_6_parceiros_inner';
    container.appendChild(innerWrapper);

    // 2. Adiciona apenas os itens originais (sem duplicar)
    items.forEach(item => innerWrapper.appendChild(item));

    // 3. Configurações do carrossel
    const itemWidth = items[0].offsetWidth + 50;
    let currentPosition = 0;
    let animationId;
    const speed = 1.0;
    let isMovingItem = false;

    function animate() {
        if (isMovingItem) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        currentPosition -= speed;
        
        // Quando o primeiro item está quase saindo completamente
        if (-currentPosition >= itemWidth * 0.9) {
            isMovingItem = true;
            
            // Prepara a transição do item que está saindo
            const firstItem = innerWrapper.firstElementChild;
            firstItem.style.transition = 'opacity 0.3s ease-out';
            firstItem.style.opacity = '0';
            
            // Aguarda a transição de fade out
            setTimeout(() => {
                // Move o item para o final com opacidade zero
                firstItem.style.transition = 'none';
                firstItem.style.transform = `translateX(${itemWidth * (items.length - 1)}px)`;
                innerWrapper.appendChild(firstItem);
                
                // Prepara para fade in
                setTimeout(() => {
                    firstItem.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-out';
                    firstItem.style.opacity = '1';
                    firstItem.style.transform = '';
                    
                    // Ajusta a posição
                    currentPosition += itemWidth;
                    innerWrapper.style.transform = `translateX(${currentPosition}px)`;
                    
                    isMovingItem = false;
                }, 50);
            }, 300);
        }
        
        innerWrapper.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(animate);
    }

    // 4. Inicia animação (sem os controles de hover que foram removidos)
    animate();

    // 5. Limpeza
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
});