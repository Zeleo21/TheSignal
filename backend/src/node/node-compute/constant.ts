

export enum AudioFormat {
    FLAC = 'FLAC',
}

export enum CodeFormat {
    HTML = 'HTML',
}

// Add more supported format as we gooo !! :D
export type FileFormat = CodeFormat | AudioFormat;

export const fileFormatToWeightMap: Record<FileFormat, number> = {
    HTML: 1,
    FLAC: 5,
}