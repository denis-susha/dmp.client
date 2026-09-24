export const formatDate = (isoDate: string, locale: string = navigator.language, showTime: boolean = true): string => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
        console.error("Invalid date:", isoDate);
        return isoDate;
    }

    const options: Intl.DateTimeFormatOptions = showTime
        ? {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
          }
        : {
              year: "numeric",
              month: "long",
              day: "numeric",
          };

    return date.toLocaleString(locale, options);
};
