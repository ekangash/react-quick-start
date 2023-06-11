import React from 'react';
import { render } from '@testing-library/react';
import { Apparent } from '@shared/apparent/Apparent';

describe('<Apparent />', () => {
    it('Должен отобразить дочерние элементы, если condition === true', () => {
        const { getByText } = render(<Apparent condition={true}>Some child</Apparent>);

        expect(getByText(/(Some child)/i)).toBeInTheDocument();
    });
    it('Не должен отображать дочерние элементы, если condition === false', () => {
        const { container } = render(<Apparent condition={false}>Some child</Apparent>);

        expect(container).toBeEmptyDOMElement();
    });
});