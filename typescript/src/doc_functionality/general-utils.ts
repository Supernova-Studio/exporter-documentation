// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - General utils


export function getFullYear(): string {
    return new Date().getFullYear().toString();
}

/* Get current formatted datetime */
export function getCurrentFormattedDateTime(): string {
    const date = new Date();

    return date.toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric', hour12: false, hour: '2-digit', minute:'2-digit'});
}