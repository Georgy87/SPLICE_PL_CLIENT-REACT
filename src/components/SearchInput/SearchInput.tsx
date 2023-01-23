import { ChangeEvent, useState, memo, FC } from 'react';

import styles from './SearchInput.module.scss';

type PropsType = {
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

const SearchInputToMemo: FC<PropsType> = ({ onChangeValue, value }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [placeholder, setPlaceholder] = useState<string>('Search genres, author');
    return (
        <div className={styles.inputContainer}>
            <label>Sounds</label>
            <div className={open ? `${styles.search} ${styles.open}` : styles.search}>
                <svg
                    data-testid={'open_input'}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                        setPlaceholder('Search genres, author');
                    }}
                    className={styles.searchIcon}
                    viewBox="0 0 512 512"
                    width="95"
                >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
                <input
                    data-testid={'search_input'}
                    type="text"
                    className={styles.searchInput}
                    onChange={onChangeValue}
                    placeholder={open ? placeholder : ''}
                />
                <svg
                    data-testid={'close_input'}
                    onClick={(e) => {
                        e.stopPropagation();
                        setPlaceholder('');
                        setOpen(!open);
                    }}
                    className={styles.searchClose}
                    viewBox="0 0 352 512"
                    width="100"
                >
                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                </svg>
            </div>
        </div>
    );
};

export const SearchInput = memo(SearchInputToMemo);
