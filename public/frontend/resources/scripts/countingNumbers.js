function countNumber(obj, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        obj.innerHTML = Math.floor(progress * (end - start) + start);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

function addWhatchedNumberCounter(id, start, end, duration) {
    const obj = document.getElementById(id);

    const callbackFunc = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
            {
                countNumber(entry.target, start, end, duration)
                observer.unobserve(entry.target)
            }
        });
    }
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver(callbackFunc, options);

    observer.observe(obj, callbackFunc)
}







  
  