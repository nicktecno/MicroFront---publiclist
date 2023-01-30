import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";

import { Like } from "@styled-icons/boxicons-regular/Like";

import notification from "../../services/notification";

import Loading from "../../components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";

const Likes = ({
  setCartLength,
  wishListApi,
  routeTranslations,
  headerUrl,
}) => {
  const history = useRouter();

  const [loading, setLoading] = useState(false);
  const [allLikes, setAllLikes] = useState([]);

  async function loadLikes() {
    setLoading(true);

    try {
      const { data: response } = await wishListApi.get(
        `/photobook/customer/like`,

        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      if (response.data !== undefined) {
        setAllLikes(response.data);
      }
      setLoading(false);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");

        sessionStorage.setItem("urlantiga", window.location.href);
        setLoading(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        notification("Erro ao carregar curtidas do Photobook", "error");
        setLoading(false);
      }
    }
  }
  async function handleDislike(item) {
    setLoading(true);

    try {
      await wishListApi.post(
        `/photobook/customer/gallery/${item.gallery_id}/image/dislike/${item.image_id}`,
        {},
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      notification("Curtida removida com sucesso", "success");
      loadLikes();
      setLoading(false);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");

        sessionStorage.setItem("urlantiga", window.location.href);
        setLoading(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        notification("Erro ao remover curtida", "error");
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.caminho>
            <Container>
              <Row>
                <Col>
                  <p>
                    <Link href="/profile">Minha Conta &#62; </Link>
                    <Link href="/profile/likes" passhref="true">
                      <span>Meus Likes</span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </S.caminho>

          <S.GeneralContainer>
            {allLikes !== undefined && allLikes.length > 0 ? (
              <S.Container>
                {allLikes.map((likes, likesIndex) => (
                  <div className="boxImage" key={likesIndex}>
                    <img src={likes.image} alt="Imagem curtida" />
                    <div
                      className="boxDislike"
                      onClick={() => handleDislike(likes)}
                    >
                      <Like />
                    </div>
                  </div>
                ))}
              </S.Container>
            ) : (
              <div className="nothing">Sem imagens curtidas</div>
            )}
            <div className="boxBack ">
              <button
                className="negativeButton"
                onClick={() => history.push("/profile")}
              >
                Voltar
              </button>
            </div>
          </S.GeneralContainer>
        </>
      )}
    </>
  );
};

export default Likes;
