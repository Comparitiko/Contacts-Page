import { useEffect, useState } from "react"
import './Contactos.css'


function Contactos () {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [page, setPage] = useState(1)

  useEffect (() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
    .then(res => res.json())
    .then(data => {
      setUsers(data.data || null)
      setTotalPages(data.total_pages)
      setIsLoading(false)
      console.log(data.total_pages)
    })
  }, [page])

  if (isLoading === true)
      return (
        <h1 className="loading">Cargando...</h1>
      )

  return (
    <>
      <div>
        <section className="contactos">
          {users.map((user) => (
            <article key={user.id} className="tarjeta-contacto">
            <h1>Contacto</h1>
            <div className="tarjeta-contacto-datos">
              <img  className='avatar' src={user.avatar} alt="Avatar usuario" />
              <div className="tarjeta-contacto-info">
                <strong className="username">
                    {`${user.first_name} ${user.last_name}`}
                </strong>
                <p className="mail-contact">Contáctame:
                  <span className="mail">
                    <a href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </span>
                </p>
              </div>
            </div>
            </article>
        ))}
        </section>
        <section className="botones">
          {
            Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
              <button className="boton" key={page} onClick={() => setPage(page)}>
                {page}
              </button>
            ))
          }
        </section>
      </div>
    </>
  )
}

export default Contactos