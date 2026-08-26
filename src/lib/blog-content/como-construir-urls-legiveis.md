# Construindo URLs legíveis.

## 1. Por que este tópico é relevante?

A própria URL é um dos componentes que compõem a estrutura técnica e semântica de uma página web, servindo tanto à compreensão do conteúdo exibido por parte dos rastreadores quanto à legibilidade para o usuário. Por isso, este tópico faz-se importante para todo programador que busca maximizar sua compreensão sobre sistemas web.

Para aplicar estes conceitos, necessitamos de embasamento teórico e referências já validadas pelo mercado. Embora nem todos tenhamos fontes claras dos mecanismos usados, podemos utilizá-los como referências reflexivas.

## 2. A teoria

A documentação oficial do Google Search Central, recomenda o uso de palavras legíveis em vez de identificadores numéricos longos, o emprego de hífens, e não *underscores,* como separador de palavras, e a codificação percentual adequada para caracteres não pertencentes ao conjunto ASCII, inclusive em URLs com palavras em outros idiomas. Essas recomendações sustentam a adoção de *slugs* textuais como boa prática de legibilidade e manutenção.

Cabe ressaltar que **não** é sustentável a ideia de que aumentar a densidade de palavras-chave na URL produza, de forma proporcional, melhor posicionamento nos resultados de busca. John Mueller, da equipe de Search Relations do Google, já caracterizou as palavras presentes na URL como um fator de peso muito leve, relevante principalmente antes da primeira indexação do conteúdo, uma vez que o mecanismo de busca rastreia e interpreta o conteúdo da página, esse sinal perde ainda mais relevância.

Portanto, **URLs legíveis favorecem a compreensão do conteúdo, a experiência do usuário, o compartilhamento e, secundariamente, alguma informação contextual para os motores de busca.**

## 3. Exemplos práticos

## 3.1 Medium.com

Uma URL típica do Medium segue o padrão:

```
https://medium.com/@arianweslley/como-usar-multiplas-chaves-ssh-d330976ffad4
```

A estrutura pode ser decomposta em três segmentos: o identificador do usuário (`@arianweslley`), o *slug* do título do conteúdo (`como-usar-multiplas-chaves-ssh`) e, ao final, um sufixo de 12 caracteres hexadecimais (`d330976ffad4`). Esse sufixo permite diferenciar URLs mesmo quando múltiplos artigos compartilham o mesmo título, a garantia efetiva de unicidade, no entanto, depende do mecanismo interno usado pelo Medium para gerá-lo, que não é documentado publicamente.

O sufixo possui 12 caracteres hexadecimais e, portanto, capacidade de representação de até 48 bits. Como o Medium não publica a estratégia usada para gerar esse valor, não é possível inferir sua entropia efetiva nem determinar se ele deriva de geração aleatória, de *hashing*, ou de qualquer outro mecanismo interno, qualquer hipótese sobre o algoritmo específico seria especulação não verificável a partir da URL. Contudo, podemos extrair deste exemplo um norte prático de como boas URLs legíveis devem se portar.

### 3.2 YouTube

```
https://www.youtube.com/watch?v=m_anIoKW7Jg
```

O YouTube adota uma estratégia distinta: o identificador público *é* a própria chave do vídeo, sem um *slug* textual associado. A documentação oficial do Google confirma que o identificador de vídeo é uma string de 11 caracteres usada na URL. Esse identificador utiliza um alfabeto compatível com Base64 modificado para uso em URL (`A-Za-z0-9-_`) e detalha uma restrição estrutural relevante: embora 11 caracteres irrestritos desse alfabeto pudessem representar nominalmente 2⁶⁶ combinações (66 bits), o último caractere só pode assumir 16 dos 64 valores possíveis, a expressão regular documentada é `[A-Za-z0-9_-]{10}[AEIMQUYcgkosw048]`, o que reduz o espaço de valores efetivamente válidos para 2⁶⁰ × 2⁴ = 2⁶⁴ (64 bits).

O que é possível afirmar com base nessas fontes: o **formato**, o **comprimento** e o **alfabeto observado**. O que essas mesmas fontes não documentam é o algoritmo interno de geração do Google, se há verificação de unicidade prévia à publicação, se o valor é puramente aleatório ou se envolve alguma outra estratégia. Essa parte permanece como interpretação plausível, não como fato documentado.

Este exemplo é interessante, pois mesmo uma ferramente desenvolvida pela Google, em que afirma uso de *slugs* como uma boa prática, tende a observar “URLs legíveis” também como informações **práticas, a depender do cenário.** 

### 3.3 Stack Overflow

```
https://stackoverflow.com/questions/851140/best-way-to-format-pretty-urls-for-numeric-ids
```

Já, o Stack Overflow expõe URLs no formato `/questions/{id}/{slug}`, em que `{id}` é o identificador numérico interno e `{slug}` é derivado do título da pergunta, segundo um dos moderadores da plataforma. Nesse caso, o roteamento do servidor depende apenas do `{id}`; o *slug* tem função exclusivamente semântica e de legibilidade, uma URL com o `{id}` correto continua funcionando mesmo que o *slug* esteja desatualizado ou ausente, comportamento discutido pela própria comunidade da Stack Exchange.

### 3.4 Identificadores curtos: NanoID

Alguns sites, como o da Eureca, utilizam elementos que podem ser interpretados como entidades de referência são exibidos usando UUID na URL. No entanto, bibliotecas como o NanoID surgiram para evitar esse espaço considerável ocupado pelo UUID, sendo uma boa alternativa para geração de identificadores públicos curtos. 

Segundo o próprio repositório do projeto, o NanoID produz, por padrão, identificadores de 21 caracteres com um alfabeto de 64 símbolos seguro para uso em URLs, obtendo uma probabilidade de colisão comparável à do UUID v4, seriam necessários aproximadamente 103 trilhões de IDs gerados para se atingir uma probabilidade de colisão de uma em um bilhão.

Duas variantes adicionais merecem registro para sistemas com alto volume de escrita. O UUID v7, formalizado pela RFC 9562, reserva 48 bits para um timestamp Unix em milissegundos nos bits mais significativos, favorecendo a ordenação cronológica e o desempenho de inserções em índices B-tree (INTERNET ENGINEERING TASK FORCE, 2024). O ULID, por sua vez, combina 48 bits de timestamp com 80 bits de aleatoriedade, totalizando 128 bits compatíveis com UUID, codificados em Base32 de Crockford, alfabeto que exclui as letras I, L, O e U para evitar ambiguidade visual.

## 4. Da observação à implementação

Consolidando os padrões observados, uma arquitetura escalável para exposição pública de URLs deve atender aos seguintes requisitos:

1. A entidade deve armazenar, ou ser capaz de derivar, um identificador público curto (`public_id`), independente da chave primária interna;
2. O *slug* pode ser calculado dinamicamente a partir do título no momento da listagem, exceto quando o usuário define e persiste um *slug* customizado, decisão que impacta diretamente a estabilidade da URL, discutida na seção 6;
3. O identificador público deve ter entropia suficiente para tornar a colisão estatisticamente controlável **em relação à escala real da aplicação**, e não apenas "improvável" em abstrato;
4. A ausência de exposição da chave primária interna (sequencial ou UUID de banco) é uma boa prática de desacoplamento e redução de enumeração, mas, como discutido na seção 7, não deve ser confundida com controle de autorização.

### 4.1 Geração de *slug* a partir de um título

```java
import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public final class SlugGenerator {

    private static final Pattern NON_ALLOWED = Pattern.compile("[^a-z0-9-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s_]+");
    private static final Pattern MULTIPLE_HYPHENS = Pattern.compile("-{2,}");
    private static final Pattern EDGE_HYPHENS = Pattern.compile("^-+|-+$");

    private SlugGenerator() {
    }

    public static String toSlug(String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("O título não pode ser nulo ou vazio.");
        }

        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", ""); // remove acentos e diacríticos

        String lower = normalized.toLowerCase(Locale.ROOT);
        String withHyphens = WHITESPACE.matcher(lower.trim()).replaceAll("-");
        String sanitized = NON_ALLOWED.matcher(withHyphens).replaceAll("");
        String collapsed = MULTIPLE_HYPHENS.matcher(sanitized).replaceAll("-");
        String result = EDGE_HYPHENS.matcher(collapsed).replaceAll("");

        if (result.isBlank()) {
            throw new IllegalStateException(
                    "O título não produziu um slug válido; considere um identificador alternativo.");
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(toSlug("Como usar múltiplas chaves SSH"));
        // saída: como-usar-multiplas-chaves-ssh
    }
}
```

Note-se que, embora esta implementação translitere caracteres acentuados para ASCII por decisão arquitetural de simplicidade, o próprio Google aceita e indexa URLs com caracteres não ASCII devidamente codificados (por exemplo, em alemão ou japonês), de modo que remover acentos **não é uma exigência de SEO**, mas uma escolha de compatibilidade e uniformidade (GOOGLE SEARCH CENTRAL, 2025).

### 4.2 Identificador público via `SecureRandom`

```java
import java.security.SecureRandom;
import java.util.HexFormat;

public final class PublicIdGenerator {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private PublicIdGenerator() {
    }

    /**
     * Gera um identificador público em hexadecimal.
     *
     * @param byteLength quantidade de bytes aleatórios (6 bytes = 12 caracteres,
     *                   equivalente ao padrão observado no Medium.com)
     * @return string hexadecimal em minúsculas
     */
    public static String generate(int byteLength) {
        byte[] randomBytes = new byte[byteLength];
        SECURE_RANDOM.nextBytes(randomBytes);
        return HexFormat.of().formatHex(randomBytes);
    }

    public static void main(String[] args) {
        System.out.println(generate(6));  // ex.: "3fa2910c77e5"
    }
}
```

### 4.3 Codificação Base62 para identificadores mais compactos

Quando o objetivo é reduzir o comprimento da URL sem perder entropia, uma alternativa é codificar bytes aleatórios em Base62 (alfabeto alfanumérico, sem caracteres especiais). Como o hexadecimal carrega 4 bits por caractere e o Base62 carrega aproximadamente 5,95 bits por caractere (log₂ 62), um identificador Base62 tende a ser cerca de **33% mais curto** que o equivalente hexadecimal para a mesma quantidade de bits de entropia:

```java
import java.math.BigInteger;
import java.security.SecureRandom;

public final class Base62Encoder {

    private static final String ALPHABET =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final BigInteger BASE = BigInteger.valueOf(62);
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private Base62Encoder() {
    }

    public static String encode(BigInteger value) {
        if (value.signum() == 0) {
            return String.valueOf(ALPHABET.charAt(0));
        }
        StringBuilder result = new StringBuilder();
        BigInteger remaining = value;
        while (remaining.signum() > 0) {
            BigInteger[] divRem = remaining.divideAndRemainder(BASE);
            result.append(ALPHABET.charAt(divRem[1].intValue()));
            remaining = divRem[0];
        }
        return result.reverse().toString();
    }

    /** Gera um identificador público Base62 a partir de bytes aleatórios seguros. */
    public static String generatePublicId(int byteLength) {
        byte[] randomBytes = new byte[byteLength];
        SECURE_RANDOM.nextBytes(randomBytes);
        BigInteger value = new BigInteger(1, randomBytes); // sinal positivo
        return encode(value);
    }

    public static void main(String[] args) {
        System.out.println(generatePublicId(8)); // ex.: "4KpQz7Xy1n"
    }
}
```

Vale registrar que essa implementação **não garante comprimento fixo**: como a codificação utiliza a representação numérica mínima do `BigInteger`, valores numericamente menores podem produzir menos caracteres Base62 — o que ocorre, por exemplo, quando os bits mais significativos dos bytes gerados são zero. Isso não reduz a entropia da geração nem altera o espaço de valores possíveis. Caso o sistema exija comprimento constante, a representação pode receber preenchimento (*padding*) à esquerda com o caractere zero do alfabeto até o comprimento máximo necessário para representar todos os valores possíveis para a quantidade de bytes escolhida, para 8 bytes (64 bits), por exemplo, esse comprimento é ⌈64 / log₂62⌉ = 11 caracteres.

## 5. Colisão e entropia: análise quantitativa, não apenas qualitativa

A probabilidade de colisão entre identificadores gerados aleatoriamente é regida pelo paradoxo do aniversário e depende diretamente da quantidade de bits de entropia disponíveis e do **volume real de IDs gerados,** não apenas do número de caracteres exibidos, nem de uma afirmação genérica de que "o risco é desprezível".

| Sistema de referência | Formato observado | Espaço de representação | Aleatoriedade conhecida |
| --- | --- | --- | --- |
| Medium | 12 caracteres hexadecimais | até 2⁴⁸ (48 bits) | desconhecida, algoritmo não documentado |
| YouTube | 11 caracteres Base64 URL-safe; último caractere restrito a 16 valores, segundo o ArchiveTeam | 2⁶⁴ valores válidos no formato observado (11 caracteres irrestritos representariam nominalmente 2⁶⁶) | desconhecida, algoritmo interno de geração não documentado |
| UUID v4 | 36 caracteres (128 bits totais) | 128 bits | 122 bits aleatórios (6 bits reservados para versão e variante) |
| NanoID (padrão) | 21 caracteres, alfabeto de 64 símbolos | 126 bits | ~126 bits aleatórios, segundo o repositório oficial |
| ULID | 26 caracteres em Base32 (128 bits totais) | 128 bits | 80 bits aleatórios + 48 bits de timestamp |

A distinção importa: "espaço de representação" é apenas o número de valores que o formato consegue expressar, enquanto "aleatoriedade conhecida" é o que de fato foi documentado pela fonte primária do sistema. Para Medium e YouTube, só é possível afirmar o primeiro, o quanto desse espaço é efetivamente aleatório permanece uma incógnita sem documentação oficial. Já para UUID v4, NanoID e ULID, ambos os números são conhecidos porque derivam de especificações públicas.

Tomando como exemplo um identificador de 6 bytes (48 bits, espaço de aproximadamente 2,8 × 10¹⁴ combinações), a probabilidade de colisão varia significativamente conforme a escala:

- Em um cenário de 10 mil identificadores gerados dentro de um mesmo escopo (por exemplo, os artigos de um único usuário), a probabilidade de colisão, pela aproximação do paradoxo do aniversário, é da ordem de 1,78 × 10⁻⁷ — aproximadamente 0,0000178%, portanto irrelevante na prática;
- Em um cenário de aproximadamente 1 milhão de identificadores gerados sob o **mesmo namespace único global**, essa probabilidade sobe para a ordem de 0,18%;
- Em um cenário de 10 milhões, a probabilidade deixa de ser desprezível.

Essa distinção é importante: 48 bits podem ser mais do que suficientes quando a unicidade é exigida apenas dentro de um escopo reduzido, por exemplo, `UNIQUE(author_id, public_id)`, mas tornam-se uma escolha mais discutível quando a restrição é `UNIQUE(public_id)` em uma base global de dezenas de milhões de registros. Nesses casos, aumentar o número de bytes aleatórios (ou migrar para NanoID/ULID/UUID v7) é a decisão mais conservadora.

Além disso, probabilidade estatisticamente baixa **não substitui** garantia de integridade em nível de banco de dados. A prática recomendada é combinar a geração aleatória com uma restrição `UNIQUE` na coluna do identificador público e uma estratégia de nova tentativa em caso de conflito.

```java
public String createWithUniqueId(PostRepository repository, int maxAttempts) {
    for (int attempt = 0; attempt < maxAttempts; attempt++) {
        String candidateId = PublicIdGenerator.generate(6);
        try {
            repository.insertWithPublicId(candidateId);
            return candidateId;
        } catch (UniqueConstraintViolationException conflict) {
            // colisão detectada pelo banco; tenta novamente com um novo ID
        }
    }
    throw new IllegalStateException("Não foi possível gerar um identificador único após " + maxAttempts + " tentativas.");
}
```

Essa separação entre "probabilidade estatística de colisão" e "garantia de integridade do banco" vale mesmo ao utilizar NanoID, UUID ou `SecureRandom`: nenhum gerador aleatório dispensa a restrição de unicidade na camada de persistência.

## 6. Estabilidade de URL: o que acontece quando o título muda

Um ponto frequentemente negligenciado em discussões sobre *slugs* é o que ocorre quando o título de um conteúdo já publicado é alterado. Se o *slug* for sempre recalculado dinamicamente a partir do título atual, a URL pública muda junto — o que rompe links já compartilhados e indexados.

Há, essencialmente, duas estratégias:

1. **Slug imutável:** persistir o *slug* gerado no momento da publicação, mesmo que o título mude posteriormente. A URL original permanece válida indefinidamente, mas pode ficar semanticamente desatualizada.
2. **Slug dinâmico com redirecionamento:** recalcular o *slug* a partir do título atual, mas manter a resolução da rota pelo `public_id` (como faz o Stack Overflow). Quando o *slug* recebido na requisição não corresponder ao *slug* atual do recurso, a aplicação responde com um redirecionamento permanente (HTTP 301 ou 308) para a URL canônica, em vez de um erro 404.

Essa segunda abordagem se conecta diretamente à documentação do Google sobre redirecionamentos: 301 e 308 são tratados como redirecionamentos permanentes e funcionam como sinal de que o destino deve se tornar a URL canônica (GOOGLE SEARCH CENTRAL, 2026).

## 7. Segurança: identificador público não é controle de acesso

O OWASP define a *Insecure Direct Object Reference* (IDOR), também tratada sob a categoria mais ampla de *Broken Object Level Authorization*, como uma vulnerabilidade que ocorre quando a aplicação permite que um usuário acesse ou manipule um objeto ao alterar a referência a esse objeto, seja essa referência um ID sequencial, um UUID, um token ou um *slug,* **sem verificar corretamente se aquele usuário tem autorização sobre o objeto**. Ou seja, o problema central não é a previsibilidade do identificador, e sim a ausência de verificação de autorização no nível do objeto: tanto `/users/123` quanto `/users/d8fd82a91cc4` podem estar vulneráveis, caso a aplicação não confirme que o usuário autenticado tem permissão para acessar aquele recurso específico.

Dito isso, o próprio OWASP reconhece que identificadores complexos e não sequenciais funcionam como uma medida de defesa em profundidade: tornam impraticável a enumeração de recursos por simples incremento numérico, e reduzem a exposição de informações indiretas sobre o sistema, como o volume total de registros ou o ritmo de criação de novos itens. Essa é uma vantagem real, mas complementar, e não deve ser confundida com autorização.

## 8. Considerações finais

Os exemplos do Medium, do YouTube, do Stack Overflow e do dev.to demonstram que não existe uma solução universal: a escolha entre um identificador puramente aleatório, um par *slug* + ID, ou uma codificação Base62 compacta deve considerar o volume real de dados, o escopo de unicidade exigido, a necessidade de ordenação e o tamanho desejado para a URL final. 

Em Java, a combinação de `SecureRandom`, `Normalizer` e uma rotina simples de codificação posicional é suficiente para reproduzir, sem dependências externas, os padrões observados nessas plataformas.

## Referências

- GOOGLE SEARCH CENTRAL. **URL structure best practices for Google Search**. Google for Developers, 2025. Atualizado em: 10 dez. 2025. Disponível em: https://developers.google.com/search/docs/crawling-indexing/url-structure. Acesso em: 13 ago. 2026.
- GOOGLE SEARCH CENTRAL. **Redirects and Google Search**. Google for Developers, 2026. Atualizado em: 14 abr. 2026. Disponível em: https://developers.google.com/search/docs/crawling-indexing/301-redirects. Acesso em: 13 ago. 2026.
- SCHWARTZ, Barry. **Google Says Words In A URL A Very Light Weight Factor But Less After Indexing**. *Search Engine Roundtable*, 15 mar. 2021. Disponível em: https://www.seroundtable.com/google-words-url-very-light-weight-factor-31081.html. Acesso em: 13 ago. 2026.
- OWASP. **Insecure Direct Object Reference Prevention Cheat Sheet**. *OWASP Cheat Sheet Series*, [s. d.]. Disponível em: https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html. Acesso em: 13 ago. 2026.
- ARCHIVETEAM. **YouTube/Technical details**. *ArchiveTeam Wiki*, [s. d.]. Disponível em: https://wiki.archiveteam.org/index.php/YouTube/Technical_details. Acesso em: 13 ago. 2026.
- GOOGLE DEVELOPERS. **YoutubeVideoIdentifier**. *Google Ads API*, v22, 2026. Disponível em: https://developers.google.com/google-ads/api/reference/rpc/v22/YoutubeVideoIdentifier. Acesso em: 13 ago. 2026.
- FOREM. **api_v1.json**. In: *forem/forem*. GitHub, [s. d.]. Disponível em: https://github.com/forem/forem/blob/main/swagger/v1/api_v1.json. Acesso em: 13 ago. 2026.
- AI. **Nano ID: a tiny, secure, URL-friendly, unique string ID generator for JavaScript**. GitHub, [s. d.]. Disponível em: https://github.com/ai/nanoid. Acesso em: 13 ago. 2026.
- ULID. **spec: the canonical spec for ULID**. GitHub, [s. d.]. Disponível em: https://github.com/ulid/spec. Acesso em: 13 ago. 2026.
- DAVIS, K.; PEABODY, B.; LEACH, P. **RFC 9562: Universally Unique IDentifiers (UUIDs)**. Internet Engineering Task Force, maio 2024. Disponível em: https://www.rfc-editor.org/rfc/rfc9562. Acesso em: 13 ago. 2026.
- ORACLE. **Predefined Character Classes**. *The Java Tutorials: Regular Expressions*. Oracle, [s. d.]. Disponível em: https://docs.oracle.com/javase/tutorial/essential/regex/pre_char_classes.html. Acesso em: 13 ago. 2026.
- GLORFINDEL. **Documentation for Stack Exchange engine URLs?** *Meta Stack Exchange*, 15 ago. 2019. Resposta à pergunta de Nathan. Disponível em: https://meta.stackexchange.com/questions/332237/documentation-for-stack-exchange-engine-urls/332251#332251. Acesso em: 13 ago. 2026.