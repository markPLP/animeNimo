import React from 'react';
import { animeUserButtonIcons, dateFormat } from '../../utils';
import { BsFillEmojiSmileFill } from 'react-icons/bs';

const RandomUserWidget = ({ loaderData }) => {
  const { last_online, gender, birthday, joined, mal_id, username, images } =
    loaderData;
  const imgUrl = images?.webp?.image_url;
  return (
    <div className="mt-5 bg-base-300 rounded-lg p-4">
      <h3 className="text-xl pb-4 min-[470px]:pb-0 mb-5">Random user</h3>
      <div>
        <figure className="flex justify-center mb-5">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={username}
              className="w-[100px] h-[100px] object-cover"
            />
          ) : (
            <BsFillEmojiSmileFill className="w-[100px] h-[100px]" />
          )}
        </figure>
        <div className="flex justify-between mb-5">
          {animeUserButtonIcons.map((button) => {
            const { id, icon } = button;
            return (
              <button
                key={id}
                className="w-[52px] h-[42px] flex items-center justify-center rounded-[4px] border border-primary hover:bg-secondary"
              >
                {React.cloneElement(icon, {
                  className: 'w-6 h-6',
                })}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              <tr>
                <th>Username</th>
                <td className="text-right capitalize text-[18px] text-primary font-bold">
                  {username}
                </td>
              </tr>
              <tr>
                <th>Last online</th>
                <td className="text-right capitalize">
                  {`${dateFormat(last_online)}`}
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td className="text-right capitalize">
                  {gender ? gender : 'n/a'}
                </td>
              </tr>
              <tr>
                <th>Birthday</th>
                <td className="text-right capitalize">
                  {birthday ? birthday : 'n/a'}
                </td>
              </tr>
              <tr>
                <th>Joined</th>
                <td className="text-right capitalize">
                  {`${dateFormat(joined)}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RandomUserWidget;
