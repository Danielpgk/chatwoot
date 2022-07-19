import axios from 'axios';
import { actions } from '../actions';
import * as types from '../../../mutation-types';
const articleList = [
  {
    id: 1,
    category_id: 1,
    title: 'Documents are required to complete KYC',
  },
];
const commit = jest.fn();
global.axios = axios;
jest.mock('axios');

describe('#actions', () => {
  describe('#get', () => {
    it('sends correct actions if API is success', async () => {
      axios.get.mockResolvedValue({ data: { payload: articleList } });
      await actions.get({ commit });
      expect(commit.mock.calls).toEqual([
        [types.default.SET_UI_FLAG, { isFetching: true }],
        [
          types.default.ADD_HELP_CENTER_ARTICLE,
          {
            id: 1,
            category_id: 1,
            title: 'Documents are required to complete KYC',
          },
        ],
        [types.default.ADD_HELP_CENTER_ARTICLE_ID, 1],
        [
          types.default.ADD_HELP_CENTER_ARTICLE_FLAG,
          { uiFlags: {}, articleId: 1 },
        ],
        [types.default.SET_UI_FLAG, { isFetching: false }],
      ]);
    });
    it('sends correct actions if API is error', async () => {
      axios.get.mockRejectedValue({ message: 'Incorrect header' });
      await expect(actions.get({ commit })).rejects.toThrow(Error);
      expect(commit.mock.calls).toEqual([
        [types.default.SET_UI_FLAG, { isFetching: true }],
        [types.default.SET_UI_FLAG, { isFetching: false }],
      ]);
    });
  });

  describe('#create', () => {
    it('sends correct actions if API is success', async () => {
      axios.post.mockResolvedValue({ data: articleList[0] });
      await actions.create({ commit }, articleList[0]);
      expect(commit.mock.calls).toEqual([
        [types.default.SET_UI_FLAG, { isCreating: true }],
        [types.default.ADD_HELP_CENTER_ARTICLE, articleList[0]],
        [types.default.ADD_HELP_CENTER_ARTICLE_ID, 1],
        [types.default.SET_UI_FLAG, { isCreating: false }],
      ]);
    });
    it('sends correct actions if API is error', async () => {
      axios.post.mockRejectedValue({ message: 'Incorrect header' });
      await expect(actions.create({ commit }, articleList[0])).rejects.toThrow(
        Error
      );
      expect(commit.mock.calls).toEqual([
        [types.default.SET_UI_FLAG, { isCreating: true }],
        [types.default.SET_UI_FLAG, { isCreating: false }],
      ]);
    });
  });

  describe('#update', () => {
    it('sends correct actions if API is success', async () => {
      axios.patch.mockResolvedValue({ data: articleList[0] });
      await actions.update({ commit }, articleList[0]);
      expect(commit.mock.calls).toEqual([
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isUpdating: true }, articleId: 1 },
        ],
        [types.default.UPDATE_HELP_CENTER_ARTICLE, articleList[0]],
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isUpdating: false }, articleId: 1 },
        ],
      ]);
    });
    it('sends correct actions if API is error', async () => {
      axios.patch.mockRejectedValue({ message: 'Incorrect header' });
      await expect(actions.update({ commit }, articleList[0])).rejects.toThrow(
        Error
      );
      expect(commit.mock.calls).toEqual([
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isUpdating: true }, articleId: 1 },
        ],
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isUpdating: false }, articleId: 1 },
        ],
      ]);
    });
  });

  describe('#delete', () => {
    it('sends correct actions if API is success', async () => {
      axios.delete.mockResolvedValue({ data: articleList[0] });
      await actions.delete({ commit }, articleList[0].id);
      expect(commit.mock.calls).toEqual([
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isDeleting: true }, articleId: 1 },
        ],
        [types.default.REMOVE_HELP_CENTER_ARTICLE, articleList[0].id],
        [types.default.REMOVE_HELP_CENTER_ARTICLE_ID, articleList[0].id],
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isDeleting: false }, articleId: 1 },
        ],
      ]);
    });
    it('sends correct actions if API is error', async () => {
      axios.delete.mockRejectedValue({ message: 'Incorrect header' });
      await expect(
        actions.delete({ commit }, articleList[0].id)
      ).rejects.toThrow(Error);
      expect(commit.mock.calls).toEqual([
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isDeleting: true }, articleId: 1 },
        ],
        [
          types.default.SET_UI_FLAG,
          { uiFlags: { isDeleting: false }, articleId: 1 },
        ],
      ]);
    });
  });
});