function formatDateISO(date:any) {
    return date.toISOString();
}

export const now = formatDateISO(new Date());