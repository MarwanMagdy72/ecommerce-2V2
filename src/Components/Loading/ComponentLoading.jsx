import React from 'react'
import { LineWave } from 'react-loader-spinner'

export default function ComponentLoading() {
  return (
    <>
              <button className="btn ms-auto d-block">
            {" "}
            <LineWave
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="line-wave"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button>
    </>
  )
}
