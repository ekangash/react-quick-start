/** 1 NodeModules */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { Loader } from '@features/loader/Loader';
import { renderWithRouter } from "@tests-utils/renderWithRouter";
import { AppExceptionHandler } from "@app/exception/AppExceptionHandler";

/** 5 Entities, Stores, Services */
/** 6 Resources */

jest.spyOn(new AppExceptionHandler(), 'onInternalServer');

const mockedHandler = jest.mocked(AppExceptionHandler);

describe('Работа без ошибок', () => {
    it('Должен сразу отобразить дочерние элементы, если initWhenDidMount === false', async () => {
        const { getByText } = render((<Loader initWhenDidMount={false}>{() => 'Some child'}</Loader>));

        await waitFor(() => expect(getByText('Some child')).toBeInTheDocument())
    });
    it('Должен отображать дочерние элементы, если функция expect определена', async () => {
        const { getByText } = render((<Loader expect={() => null}>{() => 'Some child'}</Loader>));

        await waitFor(() => expect(getByText('Some child')).toBeInTheDocument())
    });
});

const ENDPOINT = 'http://localhost/api/my-enpoint/search';
const RESPONSE_DATA_OK = 'Some 200 response child';
const RESPONSE_CODE_500 = { message: 'Ошибка на стороне сервера', type: 'UnprocessableEntityException' };

//@todo Реализовать моканье событий вложенного объекта
describe('Обработка HTTP ошибок', () => {
    const axiosMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

    beforeEach(() => {
        console.warn = jest.fn();
    });

    it('200', async () => {
        axiosMock.onGet(ENDPOINT).reply(200, RESPONSE_DATA_OK);
        const { getByText } = renderWithRouter((<Loader expect={() => axios.get(ENDPOINT).then(({ data }) => data)}>{(prop) => prop}</Loader>));

        await waitFor(() => expect(getByText(RESPONSE_DATA_OK)).toBeInTheDocument())
    });

    it('Должен вызвать событие onInternalServer', async () => {
        axiosMock.onGet(ENDPOINT).reply(500, RESPONSE_CODE_500);
        renderWithRouter((
            <Loader
                expect={() => axios.get(ENDPOINT).then(({ data }) => data)}
            >
                {(prop) => prop}
            </Loader>
        ));
        // await waitFor(() => {
        //     expect(mockedHandler.onInternalServer.calls).toHaveLength(1)
        // });
    });

    it('sesrrse', () => {

        class MockAppExceptionHandler extends AppExceptionHandler {
            constructor() {
                super();
                this.onNotFound = jest.fn();
            }
        }

        const onNotFound = jest.fn();
        const onThrowError = jest.fn();
        const loader = renderWithRouter((
            <Loader initWhenDidMount deps={[]} expect={() => { throw new Error('not found'); }} onNotFound={onNotFound} onThrowError={onThrowError}>
                {() => 'Some child'}
            </Loader>
        ));
        // loader.find('.loader');
        // expect(appExceptionHandler.onNotFound).toHaveBeenCalled();
    });

    it('Должен вызвать событие onThrowError', async () => {
        renderWithRouter((
            <Loader
                expect={() => {
                    throw new Error('Custom error');
                }}
            >
                {(prop) => prop}
            </Loader>
        ));

        // await waitFor(() => {
        //     expect(console.warn).toBeCalledWith(new Error('Custom error'))
        // });
    });



    afterEach(() => {
        axiosMock.restore();
        jest.resetAllMocks();
    });
});